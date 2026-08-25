# Project Analysis — Inventora (Inventory Management System)

_Generated: 2026-08-25 — analysis of branch `codex/project-study-changes`_

## 1. What This Project Is

**Inventora** is a multi-tenant-ish B2B inventory and order management web app built with **Next.js 15 (App Router) + TypeScript + Prisma + PostgreSQL**. It models a supply chain with four roles — `ADMIN`, `WAREHOUSE_MANAGER`, `SUPPLIER`, `RETAILER` — and three core domains:

1. **Products & Suppliers** — a shared product catalog, each product owned by a supplier.
2. **Warehouses & Inventory** — physical warehouses hold per-product stock (`Inventory` join table with quantity/min_stock/expiry).
3. **Orders** — two order flows:
   - **Retailer Orders** (`Order`/`OrderItem`) — a retailer buys from a warehouse.
   - **Supplier Orders** (`SuppOrder`/`SuppOrderItem`) — a warehouse restocks from a supplier, driven by a **configurable workflow engine** (stages like "P.O. Placed → Payment Made → Order Receipt Made → Out For Delivery → Received").

The product name/branding ("Inventora") and marketing landing page suggest the intended pitch is a lightweight alternative to tools like Zoho Inventory / Cin7 for small businesses juggling multiple warehouses, suppliers, and retail channels.

---

## 2. Directory Structure

```
app/
├── (auth)/sign-in, sign-up/         # thin route wrappers around auth components
├── api/
│   ├── auth/[...nextauth]/          # NextAuth v5 handler
│   ├── auth/register/               # manual registration endpoint
│   ├── products/                    # GET catalog (with supplier + stock rollups)
│   ├── supplier/products/           # GET products by supplier (simpler variant)
│   ├── supplier-orders/[id]/advance-stage/  # move a SuppOrder to its next workflow stage
│   ├── warehouses/
│   │   ├── add/                     # STUB — empty handler, does nothing
│   │   ├── getwarehouses/           # GET warehouses (role-scoped: ADMIN vs MANAGER)
│   │   ├── [id]/inventory/add/      # POST create product + inventory row for a warehouse
│   │   ├── [id]/inventory/delete/   # DELETE products by id
│   │   ├── [id]/inventory/getproducts/  # GET a warehouse's inventory (ADMIN only, SUPPLIER path commented out)
│   │   ├── retailer_order/getOrders/    # GET retailer orders for a warehouse
│   │   ├── supp_order/add/          # POST create a supplier order (creates workflow stage progress)
│   │   ├── supp_order/getOrders/    # GET supplier orders for a warehouse
│   │   ├── supp_order/recieve_supply/   # POST receive stock into inventory, close out order
│   │   └── summary/                 # EMPTY directory, no route file
│   └── workflows/                   # GET workflow templates for a business
├── Dashboard/page.tsx                # hardcoded/mock analytics dashboard
├── HomePage/page.tsx                 # marketing landing page (shown when logged out)
├── inventory/page.tsx, [id]/page.tsx # warehouse list + per-warehouse inventory table
├── orders/page.tsx, retailer/, supplier/  # order hub + role-specific order tables
├── products/page.tsx                 # cross-warehouse product catalog view
├── layotuwithsidebar.tsx             # app shell: sidebar nav + header (typo in filename)
└── layout.tsx, page.tsx, providers.tsx

components/
├── ui/                                # shadcn/ui primitives (button, dialog, table, form, sheet, etc.)
├── Inventory/                         # Inventorytable, Warehouse (card), SupplierInventoryTable (UNUSED)
├── Orders/                            # OrdersTable (shared supplier/retailer table), SuppOrders, RetailerOrders (dashboard cards)
├── addProducts.tsx, addWarehouse.tsx  # "add" dialogs/forms
├── placeSuppOrder.tsx                 # UNUSED — button with no handler
├── sign-in.tsx, sign-up.tsx, Navbar.tsx

lib/
├── auth.ts             # NextAuth v5 config (Credentials + Google, JWT sessions, Prisma adapter)
├── orderflow.ts         # workflow-engine helpers (ensure default business/workflow, build custom field values)
├── actions/auth.ts      # server actions for sign-in/sign-up (parallel path to the API routes)
├── validations.ts       # zod schemas (signupSchema/SignInSchema) — NOT wired into any form
├── apiClient.ts          # axios instance, baseURL "/api"
└── utils.ts

services/  (+ four duplicate root-level files: userService.ts, warehouseService.ts, productService.ts, and a services/ folder)
├── authService.ts, inventoryService.ts, orderService.ts   # axios wrappers — several call endpoints that don't exist (see §5)

hooks/
├── useWarehouse.ts     # fetches warehouses for the logged-in user
└── useManager.ts        # manager search-autocomplete for AddWarehouse (calls a missing API route)

prisma/
├── schema.prisma        # full data model incl. a generic workflow/stage engine
├── seed.ts               # ~2300-line generated seed script importing ~198 products from an Amazon CSV dump
└── migrations/           # 7 migrations, most recent adds the "modular supplier orderflow" tables

app/generated/prisma/    # Prisma Client generated output committed into the repo (custom output path)
public/                  # screenshots (dashboard.png, inventory.png, orders.png, ...) + an ERD SVG export
types.ts                 # shared frontend TS types (RetailerOrder, SupplierOrder, ProductCatalogItem, etc.)
```

---

## 3. Main User Flow

1. **Landing / Auth** — An unauthenticated visitor sees `HomePage` (marketing page with a static, non-functional signup form). Real auth happens on `/sign-up` and `/sign-in`, which POST to `/api/auth/register` or call NextAuth's Credentials provider (email/password, hashed with bcrypt) or Google OAuth. On success, a JWT session carries `id`, `email`, `name`, `role`.
2. **App shell** — Once signed in, `layotuwithsidebar.tsx` renders a sidebar (Dashboard, Products, Inventory, Orders, Reports) and header for every page.
3. **Dashboard** — Currently 100% static/mock chart data (sales, purchases, top products) — no live data wired in.
4. **Inventory** —
   - `/inventory` lists warehouses for the user's role (ADMIN sees all, WAREHOUSE_MANAGER sees only theirs) via `useWarehouse` → `GET /api/warehouses/getwarehouses`.
   - Clicking a warehouse opens `/inventory/[id]`, which loads that warehouse's stock (`GET /api/warehouses/[id]/inventory/getproducts`, ADMIN-only path implemented) and lets you add a product+inventory row (`POST /api/warehouses/[id]/inventory/add`) or bulk-delete selected rows.
5. **Products** — `/products` is a supplier-agnostic catalog view (`GET /api/products`) with search/category/stock filters and a detail side panel; this is the most complete/polished page in the app.
6. **Orders** —
   - `/orders` shows two summary cards (Supplier Orders, Retailer Orders) with **hardcoded counts** (`totalOrders={10}` etc., not fetched).
   - `/orders/supplier` and `/orders/retailer` fetch real data per warehouse (`GET .../supp_order/getOrders`, `GET .../retailer_order/getOrders`) and render it through the shared `OrdersTable` component, which supports search, status filtering, expandable rows showing line items, and — for supplier orders — a **workflow pipeline visualization** with a "Move Next" button that calls `POST /api/supplier-orders/[id]/advance-stage`.
7. **Supplier order workflow engine** — this is the most architecturally interesting part: `WorkflowTemplate` → `WorkflowStage` → `SuppOrderStageProgress` lets a business define a custom multi-stage approval/fulfillment pipeline per order type, with custom fields (`OrderFieldDefinition`/`SuppOrderFieldValue`). `lib/orderflow.ts` auto-provisions a default 5-stage template ("P.O. Placed → Payment Made → Order Receipt Made → Out For Delivery → Received") per business. Advancing through stages is transactional (`$transaction`), and reaching the final stage flips `lifecycleStatus` to `COMPLETED`. Receiving supply (`recieve_supply` route) increments warehouse inventory via `upsert`.

---

## 4. Data Model Highlights (Prisma)

- **Multi-tenancy scaffolding**: `Business` is the tenant root; `User`, `Product`, `Warehouse`, `SuppOrder`, `WorkflowTemplate` all optionally hang off a `businessId`. In practice only one "Default Business" is ever auto-created (`ensureDefaultBusiness`) — true multi-tenant isolation (e.g., scoping queries by the logged-in user's business) is not enforced anywhere in the API layer.
- **Generic workflow engine** (`WorkflowTemplate`/`WorkflowStage`/`SuppOrderStageProgress`/`OrderFieldDefinition`/`SuppOrderFieldValue`) — a genuinely reusable, well-normalized design that could support arbitrary custom pipelines and custom fields per order type, though only `SUPPLIER_ORDER` is wired up end-to-end (`RETAILER_ORDER` exists in the enum but has no matching stage logic).
- Retailer `Order`/`OrderItem` is comparatively simple (`order_status` free-text string, no stage engine).
- `Product.available_stock` exists as a denormalized field alongside `Inventory.quantity` (per-warehouse), but nothing in the API layer keeps them in sync.

---

## 5. Missing / Broken / Incomplete Features

**Non-functional or stub endpoints**
- `POST /api/warehouses/add` is an **empty function body** — "Add Warehouse" in the UI submits to it and silently does nothing (no warehouse is ever created; `addWarehouse` in `warehouseService.ts` is effectively dead).
- `app/api/warehouses/summary/` is an empty directory with no `route.ts`.
- `app/api/users/managers` (searched by `useManager.ts` for the manager-autocomplete field, and by `userService.searchManagers`) **does not exist** — manager search in "Add Warehouse" always fails silently.
- `deleteInventoryItems` in `services/inventoryService.ts` calls `DELETE /api/inventory/delete`, but the real route is `/api/warehouses/[id]/inventory/delete` — this service function is unreachable/broken (the actual `Inventorytable.tsx` component bypasses the service and calls the wrong flat path `/api/inventory/delete` too, so **bulk delete from the inventory table is broken in production**, though it may work if a matching route is added).

**Wired-up UI with no backend behavior, or vice versa**
- `components/placeSuppOrder.tsx` ("New Supplier Order" button) has **no `onClick` handler** and is **not imported anywhere** in the app — even though `POST /api/warehouses/supp_order/add` is fully implemented server-side. There is no UI path to actually create a supplier order.
- `components/Inventory/SupplierInventoryTable.tsx` (388 lines) is **not imported anywhere** — dead code.
- `/orders` (the hub page) shows hardcoded stats (`totalOrders={10}`, `pendingOrders={3}`, etc.) instead of real counts from the two order APIs.
- `Dashboard/page.tsx` is entirely mock data (sales chart, invoices, customers pie chart, top products) — none of it reflects real inventory/order state.

**Missing pages**
- The sidebar links to `/reports`, but there is no `app/reports` route — this nav item 404s.
- No retailer-facing "place an order" flow exists at all (no UI or API for a retailer to create an `Order`); only the read side (`retailer_order/getOrders`) is implemented. Retailers effectively cannot use the app to buy anything.
- No user/role management screens (inviting managers, assigning warehouses, editing roles) despite the schema supporting it (`managerId` on `Warehouse`).

**Partial role support**
- `GET /api/warehouses/[id]/inventory/getproducts` only implements the `ADMIN` branch; the `SUPPLIER` branch is commented out and `WAREHOUSE_MANAGER`/`RETAILER` are unhandled — those roles get an empty product list.
- `GET /api/warehouses/getwarehouses` only branches on `ADMIN` and `WAREHOUSE_MANAGER`; `SUPPLIER` and `RETAILER` get `undefined` warehouses.

**Cross-cutting gaps**
- **No authorization/ownership checks** in most API routes — any authenticated (or in some cases unauthenticated) request can read/write any warehouse's inventory or any business's orders; role is passed as a client-supplied query param (`?role=ADMIN`) rather than derived from the server-side session, which is also a **security hole** (a client can simply pass `role=ADMIN` to read any warehouse).
- **No tests** anywhere in the repo (no `__tests__`, no `*.test.ts`, no testing framework in `package.json`).
- **No input validation layer** on API routes — `zod` is a dependency and `lib/validations.ts` defines schemas, but no route or form actually uses them; most routes just destructure `request.json()` and trust the shape.
- Two parallel, inconsistent auth code paths exist: `lib/actions/auth.ts` (server actions, apparently intended for a form using `react-hook-form`/server actions) and `app/api/auth/register/route.ts` + `components/sign-up.tsx` (plain fetch to a REST endpoint). Only the second is actually wired into the UI; the first is dead code.
- Duplicate/competing service layers: root-level `userService.ts`, `warehouseService.ts`, `productService.ts` vs. `services/authService.ts`, `services/inventoryService.ts`, `services/orderService.ts` — inconsistent conventions, and as noted above, some of them call endpoints that don't exist.
- `test-prisma.ts` (a scratch connectivity-check script) is committed at the repo root — not part of any real test suite.
- No environment/config documentation: `README.md` is still the default `create-next-app` boilerplate; no `.env.example`; required env vars (`DATABASE_URL`, `DIRECT_URL`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `NEXTAUTH_SECRET`) are undocumented.
- Generated Prisma Client output (`app/generated/prisma/*`, including a compiled `.so.node` binary) is written to a custom output path inside `app/`; it is correctly listed in `.gitignore` and not tracked by git, but keeping generated output inside `app/` (rather than `node_modules/.prisma` or similar) is still an unusual convention worth reconsidering.

---

## 6. Code Quality Observations

- Inconsistent naming/typos throughout (`layotuwithsidebar.tsx`, `recieve_supply`, `getproducts`), inconsistent casing conventions across routes.
- Heavy use of `console.log` debugging statements left in shipped code (hooks, API routes).
- Role-based access is checked via string comparison of a client-supplied query param rather than the authenticated session (`session.user.role`), even though `lib/auth.ts` already puts `role` on the session/JWT.
- The workflow-engine design (`lib/orderflow.ts`, the `WorkflowTemplate`/`WorkflowStage` schema, and `OrdersTable`'s pipeline visualization) is the strongest, most thought-out piece of the codebase — it shows a deliberate attempt to generalize the supplier-order lifecycle rather than hardcoding stages.

---

## 7. What Value Does the Project Actually Deliver Today?

Taken as a whole, **the project is a partially-built prototype, not a usable product yet.** Concretely, what works end-to-end right now:

- ✅ User registration and login (credentials + Google OAuth), with role stored on the session.
- ✅ Viewing warehouses (scoped to ADMIN/WAREHOUSE_MANAGER) and viewing a warehouse's inventory (ADMIN role).
- ✅ Adding a new product directly into a specific warehouse's inventory.
- ✅ Browsing the full product catalog with search/filter and a supplier/stock detail panel (`/products` — the best-executed page in the app).
- ✅ Viewing supplier orders and retailer orders per warehouse, including a genuinely useful multi-stage pipeline view and the ability to advance a supplier order through its workflow stages (backend supports creating supplier orders too, just no UI trigger).
- ✅ Receiving a supplier shipment, which correctly increments warehouse inventory transactionally.

What's demoable is essentially: **register → view warehouses → view/add inventory → browse products → view and progress a supplier order's fulfillment pipeline.** That is a real, if narrow, slice of an inventory system, and the underlying data model (multi-tenant scaffolding + generic workflow engine) is more ambitious and well-designed than the UI currently exposes.

What's **not** deliverable yet: creating a warehouse, retailers placing orders, any real dashboard/reporting, supplier or retailer self-service views, and any meaningful access control. The gap between "schema/API sophistication" and "what a user can actually click through" is the single biggest issue — several endpoints exist with no UI, and a couple of UI actions exist with no working endpoint behind them.

---

## 8. Suggested Priorities (if continuing this project)

1. **Fix the broken glue first** (cheap, high-impact): implement `POST /api/warehouses/add`, add `GET /api/users/managers`, fix the inventory-delete path mismatch, wire `PlaceSuppOrder` to the already-working `supp_order/add` endpoint.
2. **Derive role/business from the session, not query params** — close the authorization hole before doing anything else with this schema.
3. **Build the retailer order-placement flow** — right now retailers have no way to actually order anything, which undermines the "Retailer Orders" half of the product.
4. Replace the Dashboard's mock data with real aggregates (order counts, low-stock counts, etc. — the data already exists via `/api/products` and the order-listing endpoints).
5. Decide on and consolidate a single service-layer convention (delete the duplicate root-level `*Service.ts` files or the `services/` folder, not both).
6. Add a minimal test suite and stop committing the generated Prisma client / scratch scripts.
