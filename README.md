

## ✅ **README.md**

# Inventory & Order Management System ( Next.js + Prisma + PostgreSQL)

A modern, scalable Inventory & Supply Chain Management System designed for:

* 🏭 **Warehouse Managers**
* 🛒 **Retailers**
* 🚚 **Suppliers**
* 🛠️ **Admins**

This project enables end-to-end product tracking from supplier to warehouse to retailer, with bulk ordering, stock tracking, and role-based dashboards.

---

## 🚀 **Features Overview**

### ✅ Multi-Role Access

| Role                  | Capabilities                                          |
| --------------------- | ----------------------------------------------------- |
| **Admin**             | Manage warehouses, users, products                    |
| **Warehouse Manager** | Manage stock, request supplier orders, receive supply |
| **Supplier**          | List products, view & process bulk retailer requests  |
| **Retailer**          | Browse catalog, bulk-order products, track deliveries |


### Screenshots
![login page](./public/login.png)
![Dashboard page](./public/dashboard.png)
![inventory page](./public/inventory.png)
![products_page](./public/products_sorting.png)
![orders page](./public/orders.png)
![orderslisting page](./public/orderslisting.png)

---

ER Diagram
![ERD](./public/diagram-export-11-5-2025-3_49_35-PM.svg)

### 📦 **Inventory Management**

* Track stocks per warehouse
* Low-stock alerts
* Batch size support
* Real-time stock updates
* SKU / Barcode reference

---

### 🔗 **Supplier Ordering Workflow**

* Warehouse requests supply
* Supplier receives request & approves / rejects
* Stock auto-updates once supply delivered

---

### 🛍️ **Retailer Marketplace**

* Browse supplier catalog
* Search + Filter by categories
* Add to cart (Bulk order)
* Track order status (Pending / Delivered / Requested)

---

### 📊 **Dashboards**

* Inventory insights
* Low stock count
* Utilisation % per warehouse
* Order & supply history

---

### 🏗️ **Tech Stack**

| Category | Tech                                 |
| -------- | ------------------------------------ |
| Frontend | Next.js, React, TypeScript, Tailwind |
| Backend  | Next.js API Routes                   |
| ORM      | Prisma                               |
| Database | PostgreSQL                           |
| Auth     | NextAuth                             |
| UI       | shadcn-ui, Lucide Icons              |

---

### 🗂️ **Folder Structure**

```
app/
 ┣ api/
 ┃ ┣ auth/
 ┃ ┣ warehouses/
 ┃ ┣ supplier/
 ┃ ┗ retailer_order/
 ┣ inventory/
 ┣ orders/
 ┣ layout.tsx
 ┗ page.tsx

components/
 ┣ Orders/
 ┣ Inventory/
 ┣ LayoutSidebar.tsx

prisma/
 ┣ schema.prisma
```

---

### ⚙️ **Environment Variables (.env)**

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

---

### 🛠️ **Setup & Run**

```bash
# install deps
npm install

# push Prisma schema
npx prisma migrate dev --name init

# run dev server
npm run dev
```

To generate Prisma UI:

```bash
npx prisma studio
```

---

### 📋 **Roadmap**

* ✅ Supplier module
* ✅ Retailer order flow
* ✅ Role-based pages
* 🕒 Cart for retailers
* 🕒 Notifications systemQ
* 🕒 Supplier inventory panel
* 🕒 Payment gateway for retailers (Razorpay planned)

---

### ❤️ Thanks

This project is part of my journey learning supply-chain & full-stack development using modern tools.
Suggestions & contributions are welcome!

---

### 📧 Contact

**Abdul Razzaq Munshi**
For queries / collaboration, feel free to reach out 🙂
[email](munshiabdulrazzaq@gmail.com)
---

