# Inventora — Progress Report

This document is a snapshot of where the refactor described in `refactor_plan.md` (repo root) actually stands: what's built and verified, what's still missing, how the application currently flows end to end, and how the codebase is laid out. It's meant to be read on its own, without needing the full chat history that produced it.

For the original problem statement and phase-by-phase plan, see `project_analysis.md` and `refactor_plan.md` in the repo root. This document reports *actual status against that plan*, including things discovered only by running the app.

---

## 1. The product, in one paragraph

Inventora is a single-business inventory management app (Next.js App Router + Prisma/Postgres + NextAuth) whose differentiator is a **configurable order workflow + multi-party portal**: instead of a hardcoded order status, a business defines its own pipeline of stages (e.g. "P.O. Placed" → "Payment Made" → "Received"), and its suppliers and retailers get their own logins into that exact pipeline instead of being coordinated over email/spreadsheets. The schema for this (`WorkflowTemplate` → `WorkflowStage` → `SuppOrderStageProgress`, with per-stage custom fields) already existed before this refactor; the work has been making the surrounding app (auth, roles, UI) trustworthy enough to build that differentiator on top of, then exposing it.

---

## 2. Status at a glance

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Stabilize & Secure (close auth holes, fix broken flows, dead code cleanup) | ✅ Done, committed |
| Phase 2 | Multi-Party Portal MVP (invites, retailer ordering, supplier stage-advance, role-aware UI) | ✅ Done, committed |
| — | Post-Phase-2 testing pass + bug fixes (this session) | ✅ Done, **not yet committed** |
| Phase 3a | No-code workflow template editor (admin UI to configure stages/fields) | ❌ Not started |
| Phase 3b | Extend the workflow engine to retailer orders | ❌ Not started |
| Phase 4 | Real dashboard & reporting (replace mock numbers with live queries) | ❌ Not started |
| Testing | Automated test suite (Vitest/Playwright) | ❌ Not started — zero automated tests exist |

Git state: `codex/project-study-changes` branch, 4 commits ahead of its remote. The five files touched during this session's bug-fix pass (`app/api/auth/register/route.ts`, `app/api/users/invite/route.ts`, `components/placeRetailerOrder.tsx`, `components/placeSuppOrder.tsx`, `components/sign-up.tsx`) are modified locally but **not committed**.

---

## 3. What was actually done

### Phase 1 — Stabilize & Secure (committed: `d1660e7`)

- Added `lib/session.ts`: `getSessionUser()`, `requireRole()`, `requireSameBusiness()`, `apiError()`/`handleApiError()` — the auth helper every route now goes through instead of trusting client-supplied `?role=`/`?id=` query params.
- Fixed routes that previously trusted client-supplied identity (`getwarehouses`, inventory routes).
- Implemented previously-empty stub routes (`warehouses/add`, `users/managers`).
- Fixed a real data-loss bug in inventory delete (it was deleting `Product` globally instead of just that warehouse's `Inventory` row, cascading to every warehouse).
- Wired up the dead "New Supplier Order" button.
- Restricted public self-registration to `RETAILER` only (see §4 below for a UI gap found and fixed this session).
- Deleted dead code: `components/Inventory/SupplierInventoryTable.tsx`, `lib/actions/auth.ts`, the broken `/reports` nav link.
- Consolidated the two competing service-layer conventions into `services/`.

A later commit (`949edff`) added a bootstrap exception: the very first user ever may self-register as `ADMIN` (since no admin exists yet to invite them).

### Phase 2 — Multi-Party Portal MVP (committed: `13d0246`)

- **Admin invites accounts**: `app/api/users/invite/route.ts` (POST creates a `SUPPLIER`/`RETAILER`/`WAREHOUSE_MANAGER` account tied to the admin's business; GET lists them) + `app/admin/users/page.tsx` UI.
- **Retailer places an order**: new `app/api/warehouses/retailer_order/add/route.ts` + `components/placeRetailerOrder.tsx`, modeled on the existing supplier-order-add pattern. Previously retailers could only *view* orders, never create one.
- **Supplier acts on their own orders**: added an ownership check to `app/api/supplier-orders/[id]/advance-stage/route.ts` (a supplier may only advance an order where `order.supplierId === user.id`); scoped `supp_order/getOrders` and `retailer_order/getOrders` to the caller's own orders.
- **Role-aware UI**: `OrdersTable.tsx` gained a `viewerRole` prop that hides the vendor/customer column and "Move Next" button appropriately when a supplier/retailer is viewing their own orders through the portal; `app/layotuwithsidebar.tsx` shows a different nav ("My Orders" only, pointing at `/portal/...`) for `SUPPLIER`/`RETAILER` sessions vs. the full internal nav for staff.
- New portal-facing pages: `app/portal/supplier/orders/page.tsx`, `app/portal/retailer/orders/page.tsx`.

### This session — end-to-end testing + bug fixes (uncommitted)

Phase 1 and 2 had never actually been run and clicked through end to end. This session did that with a real browser (Playwright, driving the local dev server against the real Supabase Postgres dev database), as both a retailer, an admin, and a supplier. Findings:

**Fixed (uncommitted):**

| # | Bug | Fix |
|---|---|---|
| 1 | `Order`/`SuppOrder`/`OrderItem`/`SuppOrderItem` Postgres id sequences were behind their actual max row ids (stale seed data) — every new order-creation attempt 500'd with a unique-constraint error | Realigned all four sequences via `setval()`; no data touched. **This was a database-state fix, not a code change** — it doesn't show up in `git status` and would need re-applying on a fresh copy of the database (see §6). |
| 2 | Sign-up's Role dropdown offered `ADMIN`/`SUPPLIER`, both guaranteed to fail for a normal visitor (backend already restricted to `RETAILER`) | `components/sign-up.tsx`: dropdown now only offers `RETAILER`/`SUPPLIER`; `ADMIN` removed entirely from the public UI (the backend's one-time bootstrap-admin path still exists for an empty database, just isn't exposed here) |
| 3 | Both order-placement dialogs (retailer and supplier) overflowed horizontally on long product names, pushing Qty inputs off-screen | Root cause was CSS Grid sizing: `DialogContent` is `display:grid`, and its child wrapper div (a grid item) defaults to `min-width:auto`, so a `truncate`d span's full un-wrapped text width was stretching the whole dialog. Added `min-w-0` to the wrapper div in `placeRetailerOrder.tsx` and `placeSuppOrder.tsx`. |
| 4 | Self-registered `RETAILER` accounts got `businessId: null`, making them invisible to the admin's business-scoped "Suppliers & Retailers" list (and any other business-scoped feature — including Phase 3's `WorkflowTemplate`, which requires `businessId`) | `app/api/auth/register/route.ts` now assigns `businessId` via `ensureDefaultBusiness()` for self-registered retailers and the bootstrap admin, matching how invited accounts already worked. One pre-existing test account was backfilled directly in the database. |
| 5 | `components/placeSuppOrder.tsx`'s Supplier dropdown was derived from `Product.supplier` — a freshly invited supplier with no products yet could never receive an order through this UI, even though the original plan called this exact upgrade out as in-scope for Phase 2 | Now fetches real `SUPPLIER`-role accounts via `getBusinessUsers('SUPPLIER')`. Also loosened `GET /api/users/invite` to allow `WAREHOUSE_MANAGER` (read-only; account creation stays `ADMIN`-only), since that role can also place supplier orders. |

**Investigated, not a code bug (left as-is):** `SuppOrder #2` in the seed data has a `supplierId` pointing to a user whose role is `RETAILER` — bad seed data, not an application defect.

**False positive (no fix needed):** an initial test suggested "My Orders" doesn't refresh after placing an order; re-testing with proper waits showed the `onCreated` refetch callback was already wired correctly — the original observation was a timing artifact of the test, not a real bug.

All changes verified with `npx tsc --noEmit` (clean) and a full re-run of both order-placement flows end to end.

---

## 4. What's still missing

### Phase 3 — Workflow Engine as the Visible Differentiator (not started)

This is the next planned phase and the one that makes the USP *visible* rather than implicit in the schema.

- **3a — No-code workflow template editor**: `app/api/workflows/route.ts` is currently **GET-only** (reads the default template). No `POST`/`PATCH`/`DELETE` exist yet for `WorkflowTemplate`, `WorkflowStage` (including reordering), or `OrderFieldDefinition`. No `app/admin/workflows/page.tsx` UI exists. This means: today, every business is permanently stuck with the one hardcoded default pipeline (`P.O. Placed → Payment Made → Order Receipt Made → Out For Delivery → Received`) baked into `lib/orderflow.ts`'s `ensureSupplierWorkflow()` — there is no way, from the UI or API, for an admin to add/rename/remove a stage or a custom field.
- **3b — Extend the engine to retailer orders**: the `WorkflowOrderType.RETAILER_ORDER` enum value exists in the schema but is completely unimplemented. Retailer orders (`Order` model) still use a plain `order_status` string with no stage progression, no `currentStageId`, no custom fields — unlike supplier orders. The plan's recommended approach is a parallel `RetailerOrderStageProgress` table mirroring `SuppOrderStageProgress`, not a shared polymorphic one.

### Phase 4 — Real Dashboard & Reporting (not started)

Every number on `/` (Dashboard) and `/orders` is **hardcoded mock data** — confirmed directly during this session's testing (both the admin and supplier dashboards showed identical `$48,988` / `6987 Invoices` / etc. regardless of account or role). No `app/api/dashboard/summary/route.ts` exists. `/reports` was removed as a dead link in Phase 1 and has not been replaced with a real page.

### Testing (not started)

Zero automated tests exist in the repo (only a stray `test-prisma.ts` script, not a real suite). The plan recommends Vitest for route/lib unit coverage plus Playwright smoke tests, prioritized: register/login → create supplier order → advance stage → receive supply → place retailer order.

### Smaller known gaps (not blocking, not yet addressed)

- No real email-invite infrastructure — an admin invites a user by setting their initial password directly and sharing it out of band (explicitly flagged as an accepted MVP limitation in the original plan, not a bug).
- Stage deletion isn't guarded yet against in-flight order progress (planned as part of Phase 3a — deleting a `WorkflowStage` today would cascade-delete any `SuppOrderStageProgress` history that used it, silently).
- Full `zod` schema coverage of every route is still partial (`lib/validations.ts` covers the routes touched so far; extending it is called out as ongoing, incremental work in the original plan, not a one-time task).

---

## 5. How the application actually flows today

### Auth & session

1. A visitor can self-register at `/sign-up` as `RETAILER` (the only role the public form now offers) or `SUPPLIER` (offered, but always rejected server-side unless an admin session is invoking it — see below). The very first user ever in an empty database may also bootstrap as `ADMIN`, but that path isn't exposed in the UI dropdown.
2. `POST /api/auth/register` (`app/api/auth/register/route.ts`) validates via `signupSchema`, checks the role-creation rule above, assigns the account to the single default `Business` row (via `ensureDefaultBusiness()` in `lib/orderflow.ts`), hashes the password, and creates the `User`.
3. Login (`/sign-in`) goes through NextAuth's Credentials provider (`lib/auth.ts`), which compares the password hash and issues a JWT session carrying `id`, `role`, and `businessId`.
4. Every API route calls `getSessionUser()` (`lib/session.ts`) to get a verified `{ id, role, businessId, email, name }` from that session — never from a request parameter — then `requireRole()` and/or `requireSameBusiness()` to authorize the specific action.
5. To create additional `ADMIN`/`SUPPLIER`/`WAREHOUSE_MANAGER` accounts after the bootstrap admin exists, an authenticated `ADMIN` uses `app/admin/users/page.tsx`, which calls `POST /api/users/invite`.

### Role-based navigation

`app/layotuwithsidebar.tsx` reads the session role and renders one of three nav sets:
- `ADMIN` / `WAREHOUSE_MANAGER`: full internal nav — Dashboard, Products, Inventory, Orders, and (admin-only) Accounts.
- `SUPPLIER`: just "My Orders" → `/portal/supplier/orders`.
- `RETAILER`: "Catalog" (`/products`) and "My Orders" → `/portal/retailer/orders`.

### Supplier order lifecycle

1. Staff (`ADMIN`/`WAREHOUSE_MANAGER`) opens "New Supplier Order" from `/orders/supplier` (`components/placeSuppOrder.tsx`), picks a warehouse, a real supplier account, and products (filtered to that supplier's own catalog), and submits.
2. `POST /api/warehouses/supp_order/add` resolves (or creates, via `ensureSupplierWorkflow()`) the business's default `WorkflowTemplate`, creates the `SuppOrder` + `SuppOrderItem`s + one `SuppOrderStageProgress` row per stage (first stage `ACTIVE`, the rest `PENDING`), inside a single transaction.
3. The supplier logs into `/portal/supplier/orders` and sees only their own orders (scoped by `supplierId`). Clicking "Move Next" calls `POST /api/supplier-orders/[id]/advance-stage`, which checks `order.supplierId === user.id` (or lets staff advance anything in their business), then transactionally completes the active stage and activates the next one — or marks the whole order `COMPLETED` if it was the last stage.
4. Staff separately confirm physical receipt via `recieve_supply` (explicitly `ADMIN`/`WAREHOUSE_MANAGER`-only — a supplier claiming "dispatched" and a warehouse confirming "received" are deliberately separate steps).

### Retailer order lifecycle

1. A retailer logs into `/portal/retailer/orders`, opens "Place Order" (`components/placeRetailerOrder.tsx`), picks a warehouse and products from the live catalog (`GET /api/products`), and submits.
2. `POST /api/warehouses/retailer_order/add` creates the `Order` + `OrderItem`s with `retailerId` taken from the verified session (never the client), on the simple `order_status` string model — retailer orders don't yet ride the workflow engine (that's Phase 3b).
3. The retailer's own order list (`GET /api/warehouses/retailer_order/getOrders`) is scoped to `where: { retailerId: user.id }`.

### Where the workflow engine's schema lives today (built, but not editable)

`lib/orderflow.ts` is the only code that touches the workflow tables right now:
- `ensureDefaultBusiness()` — gets or creates the single `Business` row (this deployment is intentionally single-tenant for now).
- `ensureSupplierWorkflow(businessId)` — gets or creates that business's default `WorkflowTemplate` (with a hardcoded 5-stage `WorkflowStage` list) the first time it's needed.
- `getSupplierWorkflow()` / `buildCustomFieldCreates()` — helpers used by `supp_order/add` to resolve a template and map submitted custom-field values to `OrderFieldDefinition` rows.

None of this is reachable from any UI yet — it only runs implicitly the first time a supplier order is created for a business. Phase 3a is entirely about putting a real editor in front of it.

---

## 6. Running this locally

```bash
npm run dev              # Next.js dev server (Turbopack), http://localhost:3000
npx prisma studio         # ground-truth DB inspector
npx prisma migrate status # confirm the DB schema is up to date
```

The dev database is a real Postgres instance (Supabase), configured via `.env`'s `DATABASE_URL`/`DIRECT_URL` — there is no local/sqlite fallback.

**If you see a new order/product creation 500 with a Postgres unique-constraint error on `id`**: this project's dev database was originally seeded with explicit ids (bypassing the auto-increment sequence), which desyncs the sequence from the actual max row id the first time a *new* row is inserted through the app rather than the seed script. Fix by realigning the affected table's sequence, e.g.:

```sql
SELECT setval(pg_get_serial_sequence('"Order"', 'id'), COALESCE((SELECT MAX(id) FROM "Order"), 1));
```

(This was already done once for `Order`, `SuppOrder`, `OrderItem`, and `SuppOrderItem` on the current dev database as part of this session's testing — it's a database-state fix, not something `git status` will show, and won't survive a database reset/reseed.)

Test accounts created during this session's QA pass (left in the database for further manual testing):

| Role | Email | Password |
|---|---|---|
| Admin | `qa-admin-test@example.com` | `QaTestAdmin123!` |
| Supplier | `qa-supplier-test@example.com` | `QaTestSupplier123!` |
| Retailer | `testsupplierbug@example.com` | `password123` |

---

## 7. Project file structure

```
inventory_management_2/
├── app/                                  # Next.js App Router — pages + API routes
│   ├── (auth)/
│   │   ├── sign-in/page.tsx              # Login page
│   │   └── sign-up/page.tsx              # Public registration (RETAILER/SUPPLIER only)
│   ├── admin/
│   │   └── users/page.tsx                # Admin: list + invite Supplier/Retailer/Manager accounts
│   ├── api/                              # Route handlers (all behind lib/session.ts auth)
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth handler
│   │   │   └── register/route.ts         # Public self-registration
│   │   ├── products/route.ts             # Live product catalog (reference-quality route)
│   │   ├── supplier/products/route.ts    # A supplier's own inventory across warehouses
│   │   ├── supplier-orders/[id]/advance-stage/route.ts   # Stage-progression transaction
│   │   ├── users/
│   │   │   ├── invite/route.ts           # POST: admin creates account · GET: list business accounts
│   │   │   └── managers/route.ts         # Manager search (used by Add Warehouse)
│   │   ├── warehouses/
│   │   │   ├── add/route.ts
│   │   │   ├── getwarehouses/route.ts
│   │   │   ├── [id]/inventory/{add,delete,getproducts}/route.ts
│   │   │   ├── retailer_order/{add,getOrders}/route.ts
│   │   │   └── supp_order/{add,getOrders,recieve_supply}/route.ts
│   │   └── workflows/route.ts            # GET-only today — Phase 3a adds POST/PATCH/DELETE here
│   ├── Dashboard/page.tsx                # Mock data — Phase 4
│   ├── HomePage/page.tsx                 # Marketing landing page (shown to logged-out visitors)
│   ├── inventory/{page.tsx,[id]/page.tsx}
│   ├── orders/
│   │   ├── page.tsx                      # Mock stat widgets — Phase 4; links into the two below
│   │   ├── retailer/page.tsx             # Staff view of all retailer orders
│   │   └── supplier/page.tsx             # Staff view of all supplier orders + "New Supplier Order"
│   ├── portal/                           # Counterparty-facing pages (Phase 2)
│   │   ├── retailer/orders/page.tsx      # A retailer's own orders + "Place Order"
│   │   └── supplier/orders/page.tsx      # A supplier's own orders + stage advance
│   ├── products/page.tsx                 # Full catalog (also used as the retailer's "Catalog")
│   ├── generated/prisma/                 # Generated Prisma client (checked in — do not hand-edit)
│   ├── layotuwithsidebar.tsx             # Shared shell: role-based nav + header
│   ├── layout.tsx / page.tsx / providers.tsx
│   └── globals.css
├── components/
│   ├── Inventory/{Inventorytable.tsx,Warehouse.tsx}
│   ├── Orders/
│   │   ├── OrdersTable.tsx               # Shared table; `viewerRole` prop drives portal-safe rendering
│   │   ├── RetailerOrders.tsx / SuppOrders.tsx   # Stat-card links into /orders/{retailer,supplier}
│   ├── ui/                               # shadcn/radix primitives (button, dialog, table, etc.)
│   ├── addProducts.tsx / addWarehouse.tsx
│   ├── inviteUser.tsx                    # Dialog used by app/admin/users
│   ├── placeRetailerOrder.tsx            # "Place Order" dialog (retailer portal)
│   ├── placeSuppOrder.tsx                # "New Supplier Order" dialog (staff)
│   ├── sign-in.tsx / sign-up.tsx
│   └── Navbar.tsx
├── hooks/
│   ├── useManager.ts                     # Manager search/autocomplete (Add Warehouse)
│   └── useWarehouse.ts                   # Fetches the caller's visible warehouses
├── lib/
│   ├── auth.ts                           # NextAuth config (Credentials + Google providers)
│   ├── session.ts                        # getSessionUser / requireRole / requireSameBusiness / handleApiError
│   ├── orderflow.ts                      # Workflow-engine helpers (ensure/get workflow, custom fields)
│   ├── validations.ts                    # zod schemas
│   ├── apiClient.ts                      # axios instance (baseURL /api, withCredentials)
│   └── utils.ts
├── services/                             # Client-side fetch wrappers, one per domain
│   ├── authService.ts / userService.ts / productService.ts
│   ├── warehouseService.ts / inventoryService.ts / orderService.ts
├── prisma/
│   ├── schema.prisma                     # Full data model (User, Product, Order/SuppOrder,
│   │                                      #   WorkflowTemplate/Stage, OrderFieldDefinition, ...)
│   ├── migrations/                       # 8 migrations, most recent adds the workflow-engine tables
│   ├── prisma.ts                         # Shared PrismaClient instance
│   └── seed.ts                           # CSV-derived product/supplier seed script
├── types.ts                              # Shared frontend TS types
├── constants/index.ts
├── project_analysis.md                   # Original audit this whole refactor is based on
├── refactor_plan.md                      # The phased plan (source of truth for phase numbering)
└── completed_stages/
    └── README.md                         # This file
```

**Not yet present** (would be added by the remaining phases): `app/admin/workflows/page.tsx`, `app/api/workflows/[id]/...` mutation routes, `app/api/dashboard/summary/route.ts`, `app/reports/page.tsx`, `lib/stock.ts` (planned shared stock-threshold helper), and any `*.test.ts`/`*.spec.ts` files.
