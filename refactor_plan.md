# Inventora: USP Definition + Phased Refactor Plan

## Context

`project_analysis.md` (repo root) documented that Inventora is currently a partially-built prototype: solid, ambitious data model (multi-tenant scaffolding, a genuinely reusable workflow-engine schema) but a UI/API layer full of stubs, dead code, path mismatches, and a client-trusted-role security hole. It also has no clear differentiator from established tools like Zoho Inventory or Cin7 — it currently reads as "a smaller version of those tools," not a product with its own reason to exist.

This plan does two things: (1) defines a concrete USP grounded in what's *already partially built* rather than bolted on, and (2) lays out an incremental, fix-forward sequence of phases to close the gap between "impressive schema" and "thing a user can actually click through," culminating in that USP being the visible, differentiating feature of the product.

**Decisions locked in with the user before this plan was written:**
- **USP**: Workflow + multi-party portal (defined below).
- **Tenancy**: stay single-business-per-deployment for now; do not build multi-tenant SaaS isolation this round.
- **Refactor philosophy**: incremental fix-forward — keep the current stack/pages/components, fix what's broken, build the USP on top. No rewrite.
- **AI chatbot navigation**: dropped entirely, not in scope anywhere in this plan.

---

## The USP: "Configurable Order Workflows + Multi-Party Portal"

**The pitch:** Most inventory tools give you one fixed order lifecycle and make you either live with it or pay for expensive custom development to change it. Inventora already has a genuinely reusable schema for this — `WorkflowTemplate` → `WorkflowStage` → `SuppOrderStageProgress`, with per-stage custom fields via `OrderFieldDefinition`/`SuppOrderFieldValue` — sitting mostly unused behind the UI. The USP is to make this the *visible, central* feature:

1. **A business defines its own order pipeline, no code required** — stage names, order, required custom fields (e.g., "PO Number", "Expected Delivery Date") — instead of adapting their process to fit the software's hardcoded statuses.
2. **Suppliers and retailers get their own logins into that exact pipeline** — not read-only exports, not email/phone/spreadsheet coordination. A supplier sees their incoming orders and can act on their stage; a retailer can place an order and track it through to fulfillment. This is the "multi-party portal" half — it's what turns Inventora from an internal tool into a coordination surface between a business and the people it actually orders from and sells to.
3. Together, these are hard for a generic competitor to bolt on later without a similar schema investment — Inventora already has it 60% built (the schema and the transactional advance-stage logic exist; what's missing is authorization, a UI to configure it, and a way for the *other side* of each order to log in and use it).

This is deliberately not "AI-powered" anything — the differentiation is structural (configurability + who gets access), not a model bolted on top.

---

## Phase 1 — Stabilize & Secure

**Goal:** every existing button/page does what it visually promises, and no API route trusts client-supplied identity. This phase is a prerequisite for everything else — Phase 2's portal is meaningless if role/identity checks aren't real yet.

### 1a. Session-based authorization helper (build this first — everything else depends on it)
Add `lib/session.ts`:
- `getSessionUser()` — calls `auth()` from `lib/auth.ts`, returns `{ id, role, businessId, email, name }` derived from the verified session, never from a query param.
- `requireRole(user, roles: Role[])` — throws a typed error (401/403) if not allowed.
- `requireSameBusiness(user, resourceBusinessId)` — ownership guard (not multi-tenant isolation, just "don't let user A act on user B's order/warehouse by tampering with a URL/body").
- `apiError(status, message)` — consistent JSON error shape (routes currently mix `{error}` and `{message}`).

To avoid an extra DB hit per request, extend `lib/auth.ts`'s `jwt`/`session` callbacks to also stash `businessId` on the token at login (same pattern already used for `role`), plus the matching `declare module "next-auth"` type addition.

### 1b. Fix routes that trust client-supplied `role`/`id`
Confirmed locations (all currently read `searchParams.get('role')`/`get('id')` instead of the session):
- `app/api/warehouses/getwarehouses/route.ts` — only branches on `ADMIN`/`WAREHOUSE_MANAGER`; `SUPPLIER`/`RETAILER` get `undefined` and the code isn't even guarded against that. Rewrite using `getSessionUser()`: `ADMIN` → all; `WAREHOUSE_MANAGER` → `where: { managerId: user.id }`; `SUPPLIER`/`RETAILER` → business-scoped read (needed so Phase 2's portal has warehouses to reference).
- `app/api/warehouses/[id]/inventory/getproducts/route.ts` — `SUPPLIER` branch is literally commented out. Add it for real: a supplier sees inventory for products they supply (`where: { warehouseId, product: { supplierId: user.id } }`); retailers get the catalog shape from `app/api/products/route.ts`, not raw inventory (they shouldn't see internal `min_stock`).
- `app/api/warehouses/[id]/inventory/add/route.ts` — drop the unused `id`/`role` params, add `requireRole(["ADMIN","WAREHOUSE_MANAGER"])`.
- Routes that read non-identity query params (`warehouseId`, `type`, `page`) are fine as-is — just add a `getSessionUser()` call so they reject unauthenticated calls: `app/api/workflows/route.ts`, `app/api/warehouses/supp_order/recieve_supply/route.ts`, `app/api/supplier/products/route.ts`, `app/api/warehouses/supp_order/getOrders/route.ts`, `app/api/warehouses/retailer_order/getOrders/route.ts`, `app/api/products/route.ts`. Role-scoping these by "only see your own orders" is Phase 2 work since it depends on the portal's access model.

### 1c. Implement the stub and missing routes
- `app/api/warehouses/add/route.ts` — currently a completely empty POST handler. Implement: session + `requireRole(["ADMIN"])`, create the `Warehouse` with `businessId: user.businessId`. This unblocks `components/addWarehouse.tsx`, which currently submits into the void.
- `app/api/users/managers/route.ts` (new) — `hooks/useManager.ts` and `userService.ts`'s `searchManagers` call this and it doesn't exist. Session + `requireRole(["ADMIN"])`, search `User` where `role: "WAREHOUSE_MANAGER"` and name matches. This is also the pattern Phase 2 generalizes for finding suppliers/retailers.

### 1d. Fix the inventory-delete path mismatch (and a real data-loss bug underneath it)
`services/inventoryService.ts`'s `deleteInventoryItems` calls `DELETE /api/inventory/delete` (doesn't exist); `components/Inventory/Inventorytable.tsx` also fetches that same wrong flat path directly instead of using the service. The real route is `app/api/warehouses/[id]/inventory/delete/route.ts`. Fix: thread `warehouseId` through to the service call and route the UI through the service function instead of an inline fetch. **While touching this route, fix a correctness bug found in it**: it currently runs `db.product.deleteMany({ where: { id: { in: ids } } })` — "remove from this warehouse" is actually deleting the `Product` globally, cascading to every warehouse's `Inventory` row for it via the schema's `onDelete: Cascade`. It should be `db.inventory.deleteMany({ where: { warehouseId, productId: { in: ids } } })` instead.

### 1e. Wire up the dead "New Supplier Order" button
`components/placeSuppOrder.tsx` has no `onClick` and isn't rendered anywhere, even though `app/api/warehouses/supp_order/add/route.ts` fully works. Wire it as a dialog (reuse `components/ui/dialog.tsx`, same pattern as `addWarehouse.tsx`) that posts to the existing working endpoint, rendered from `app/orders/supplier/page.tsx`'s header. This gets upgraded in Phase 2 once real supplier accounts exist (supplier picker becomes a lookup against real `SUPPLIER`-role users instead of a raw ID field).

### 1f. Dead code and security-adjacent cleanup
- Delete `components/Inventory/SupplierInventoryTable.tsx` (388 lines, unreferenced anywhere, near-duplicate of `Inventorytable.tsx`'s tanstack-table logic with no unique value).
- Delete `lib/actions/auth.ts` (unused server actions, dead in favor of the REST flow through `components/sign-up.tsx`).
- `app/layotuwithsidebar.tsx` — remove the `/reports` nav item (no matching route exists; a real minimal Reports page is Phase 4 scope).
- `app/api/auth/register/route.ts` currently lets anyone self-register as `ADMIN` (no role restriction, and `password` isn't even null-checked before hashing — will throw a cryptic error on a missing password). Restrict public self-registration to `RETAILER` only (matches the OAuth-created-user default role already in `lib/auth.ts`); creating `WAREHOUSE_MANAGER`/`SUPPLIER`/`ADMIN` accounts requires an authenticated `ADMIN` session — this is also the seam Phase 2's invite flow builds on.
- Wire `lib/validations.ts`'s existing `signupSchema`/`SignInSchema` into `register/route.ts` and the credentials `authorize()` callback; add schemas for `addWarehouse`, `addInventory`, and `createSuppOrder` (the other routes touched in this phase) — full route coverage isn't realistic in one phase, extend incrementally as later phases touch more routes.
- Consolidate the two service-layer conventions: move root-level `userService.ts`/`warehouseService.ts`/`productService.ts` into `services/` (the majority convention), update their ~4 import sites, delete the root-level duplicates. Also worth aligning `hooks/useWarehouse.ts` and `hooks/useManager.ts` to use the service layer instead of raw `fetch` while these files are already being touched for the role/id fixes.

**Explicitly out of scope for Phase 1** (deferred to Phase 4 per the plan below): `app/orders/page.tsx`'s hardcoded stats and `app/Dashboard/page.tsx`'s mock chart data — neither calls a real API today, so nothing breaks by leaving them for now.

---

## Phase 2 — Multi-Party Portal MVP (the USP becomes real)

**Depends on:** Phase 1's `lib/session.ts` helpers and the register-route role restriction.

### 2a. Admin invites supplier/retailer accounts
No new tables needed — reuse `User.role` + `User.businessId` + `Product.supplierId`. New `app/api/users/invite/route.ts`: session + `requireRole(["ADMIN"])`, creates a `User` with `businessId: user.businessId` and an admin-set initial password (building real email-invite infrastructure is out of scope for "no new stack" — flag this as a known MVP limitation, not a blocker). New admin UI `app/admin/users/page.tsx` — list + invite dialog, same `components/ui/dialog.tsx` pattern as `addWarehouse.tsx`.

### 2b. Retailer places an order — currently only the read side exists
This is the load-bearing new piece; it directly closes the "retailers can't buy anything" gap.
- **API**: new `app/api/warehouses/retailer_order/add/route.ts` (mirrors the naming of its sibling `retailer_order/getOrders`), modeled directly on the working `supp_order/add/route.ts` pattern (resolve request → compute total → nested `create` of order + items). `retailerId` comes from `getSessionUser()`, never the client. `Order` has no workflow/stage fields today — keep retailer orders on the simple `order_status` string model for this phase; extending them onto the workflow engine is Phase 3 scope, not this one.
- **UI**: a "Place Order" flow off `app/orders/retailer/page.tsx`, reusing `app/products/page.tsx`'s catalog fetch (`GET /api/products`, already returns everything needed: supplier, stock, price) as the product picker, plus simple cart-style local state. New `components/placeRetailerOrder.tsx`.
- Once role-scoping lands (2d), `retailer_order/getOrders` must filter to `where: { retailerId: user.id }` for `RETAILER` callers instead of returning everyone's orders for a warehouse.

### 2c. Supplier acts on their own incoming orders
`app/api/supplier-orders/[id]/advance-stage/route.ts` currently has zero auth — anyone can advance any order. Reuse it rather than forking a variant: add session + ownership check (`SUPPLIER` may only advance an order where `order.supplierId === user.id`; `ADMIN`/`WAREHOUSE_MANAGER` can advance any order in their business). Per-stage-name role rules (e.g., "only warehouse staff can mark Payment Made") are deliberately **not** hardcoded here since stage names are business-defined — that granularity is a natural Phase 3 workflow-editor concern. Also scope `supp_order/getOrders` so a `SUPPLIER` caller only ever sees `where: { supplierId: user.id }` regardless of `warehouseId` passed in. Keep `recieve_supply` (confirming a shipment landed in the warehouse) `ADMIN`/`WAREHOUSE_MANAGER`-only — separation of duties between "supplier claims dispatched" and "warehouse confirms received" is inherent to the portal's value proposition.

### 2d. Role-aware `OrdersTable.tsx`
Today `OrdersTable`'s `role` prop means "which kind of order list is this" (used by internal staff viewing either type), not "who is viewing it." Add an optional `viewerRole?: Role` prop (default preserves current staff-view behavior). When `viewerRole === "SUPPLIER"` or `"RETAILER"`, hide the customer/vendor column and gate the "Move Next" button's visibility appropriately (retailers never see it). New portal-facing pages: `app/portal/supplier/orders/page.tsx`, `app/portal/retailer/orders/page.tsx`, fetching only the signed-in user's own (now safely scoped) orders. Add role-conditional nav entries in `app/layotuwithsidebar.tsx` so `SUPPLIER`/`RETAILER` sessions see "My Orders" pointing at `/portal/...` instead of the internal-staff `/orders`, `/products`, `/inventory` links.

**No schema changes are required for Phase 2** — existing FKs (`User.businessId`, `Product.supplierId`, `SuppOrder.supplierId`, `Order.retailerId`) are sufficient to scope every query by "am I this order's counterparty."

---

## Phase 3 — Workflow Engine as the Visible Differentiator

This is where the USP stops being "implicit in the schema" and becomes something a user configures and sees.

### 3a. No-code workflow template editor
New `app/admin/workflows/page.tsx` + extend `app/api/workflows/route.ts` (currently GET-only) with `POST`/`PATCH`/`DELETE` for `WorkflowTemplate`, `WorkflowStage` (reordering via `position`), and `OrderFieldDefinition` (add/edit/remove custom fields against the existing `CustomFieldType` enum). Since `lib/orderflow.ts`'s `ensureSupplierWorkflow()` already establishes an "always one default template" model matching `WorkflowTemplate.isDefault`, the editor extends that rather than replacing it — admins can edit the default or add alternates. Guard stage deletion: the schema's `onDelete: Cascade` on `SuppOrderStageProgress.stage` means deleting a stage silently deletes order history for any order that used it — block deleting a stage that has any non-`PENDING` progress rows attached, don't rely on DB cascade for something this visible.

### 3b. Extend the engine to retailer orders
`WorkflowOrderType.RETAILER_ORDER` already exists in the schema enum but is fully unimplemented. **Recommended approach**: mirror `SuppOrder`'s pattern rather than building a shared polymorphic table — add `RetailerOrderStageProgress` (same shape as `SuppOrderStageProgress`) plus `currentStageId`/`workflowTemplateId` columns on `Order`, and a parallel `RetailerOrderFieldValue`. This matches the codebase's existing convention of parallel `SuppOrder`/`Order` and `SuppOrderItem`/`OrderItem` models rather than introducing a new nullable-dual-FK polymorphic pattern, and it lets this ship without touching `SuppOrder`'s already-working code path. `lib/orderflow.ts`'s `buildCustomFieldCreates()` already takes generic definitions, so it's reusable as-is; a new `ensureRetailerWorkflow()` mirrors `ensureSupplierWorkflow()`. Treat this sub-phase as exploratory/lower-priority than 3a — land the editor first, extend to retailer orders once that's proven out.

---

## Phase 4 — Real Dashboard & Reporting

Replace every hardcoded number with a live query, reusing the low-stock/critical-stock threshold logic that already exists correctly in `app/api/products/route.ts` (`lowStockCount`/`criticalStockCount`) rather than re-deriving thresholds a third time (a near-identical copy already exists independently in `getwarehouses/route.ts` — consolidate all of it into a shared `lib/stock.ts` helper while touching this).

- New `app/api/dashboard/summary/route.ts` — session-gated, role-appropriate aggregates (`db.suppOrder.groupBy`, `db.order.groupBy`, plus the shared stock-count helper).
- `app/orders/page.tsx` — replace hardcoded `totalOrders={10}` etc. with real counts from the summary route; `SuppOrders.tsx`/`RetailerOrders.tsx` prop contracts don't need to change, only the caller.
- `app/Dashboard/page.tsx` — swap the mock `salesData`/`pieData` arrays for real data; the existing `recharts` components just need real `data` props, no charting-library change.
- Minimal `app/reports/page.tsx` restoring the nav link Phase 1 removed, backed by the same summary endpoint.

---

## Cross-Cutting: Testing (land alongside Phase 4, or as Phase 5 if preferred)

The repo has zero automated tests today. Recommend **Vitest** (fast, ESM-native, no extra config needed given the `type: "module"` `package.json` already in place) for unit coverage of route handlers and `lib/orderflow.ts`/`lib/session.ts`, plus a couple of **Playwright** smoke tests for the two flows that involve real multi-step UI. Highest-value coverage, in order:
1. Register + login — the base every other flow depends on.
2. Create supplier order (`supp_order/add`) — the most complex data-shaping code in the repo (workflow resolution).
3. Advance stage — transactional stage progression + (post-Phase-2) the new ownership check.
4. Receive supply — the only place stock quantities are mutated.
5. Place retailer order (Phase 2's new route) — the newest, least battle-tested path, and the USP's core new flow.

---

## Critical Files Reference

| File | Role in this plan |
|---|---|
| `lib/auth.ts` | NextAuth config; extend `jwt`/`session` callbacks with `businessId` in Phase 1a |
| `lib/orderflow.ts` | Existing workflow-engine helpers; extend, don't replace (Phase 2, 3) |
| `lib/session.ts` | New in Phase 1a — the auth helper everything else depends on |
| `app/api/warehouses/supp_order/add/route.ts` | Working reference pattern for Phase 2's retailer-order-add route |
| `app/api/supplier-orders/[id]/advance-stage/route.ts` | Add ownership auth in Phase 2c; extend to retailer orders in Phase 3b |
| `components/Orders/OrdersTable.tsx` | Extend with `viewerRole` in Phase 2d; already has the pipeline visualization to reuse |
| `app/api/warehouses/getwarehouses/route.ts` | Primary example of the client-trusted-role bug fixed in Phase 1b |
| `app/api/products/route.ts` | Reference-quality route; source of the stock-threshold logic to consolidate in Phase 4 |
| `prisma/schema.prisma` | No changes needed through Phase 2; Phase 3b adds `RetailerOrderStageProgress` etc. |

---

## Verification (no automated tests exist until the testing phase lands)

General setup: `npm run dev`, `npx prisma studio` as the ground-truth DB inspector, browser devtools Network tab to confirm request/response shapes.

- **Phase 1**: sign in as a non-ADMIN test user, manually hit a fixed route with a tampered `?role=ADMIN` query param and confirm it's ignored/rejected; submit Add Warehouse and confirm a row appears in Prisma Studio; confirm manager-search suggestions populate; delete inventory rows and confirm only that warehouse's `Inventory` rows are removed (not the global `Product`); click "New Supplier Order" and confirm a `SuppOrder`+items+stage-progress trio appears; confirm `/reports` is no longer a dead link; confirm anonymous registration as `ADMIN` is now rejected.
- **Phase 2**: as `ADMIN`, invite a `SUPPLIER` and a `RETAILER`; as the retailer, place an order and confirm it's scoped correctly; as the supplier, confirm the portal view shows only their own orders (create a second supplier's order via Prisma Studio directly as a negative-case check) and that advancing someone else's order is rejected; confirm `recieve_supply` is rejected for a supplier session.
- **Phase 3**: as `ADMIN`, add a stage to the default template and confirm new supplier orders pick it up; attempt to delete a stage with in-flight progress and confirm it's blocked; if 3b lands, confirm a retailer order now carries stage-progress rows and renders in the pipeline UI.
- **Phase 4**: compare dashboard/orders-hub displayed counts against manual `GROUP BY` queries in Prisma Studio; change an order's status and confirm the dashboard reflects it on refresh (proving it's live, not mock).
