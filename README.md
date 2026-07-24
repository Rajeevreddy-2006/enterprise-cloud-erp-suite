# 🚀 AMDOX ERP – Multi-Tenant Enterprise Resource Planning Platform

AMDOX ERP is a modern, enterprise-grade **Multi-Tenant Enterprise Resource Planning (ERP)** platform built to automate and centralize business operations within a single secure application. The platform integrates Human Resources, Procurement, Inventory, Customer Relationship Management (CRM), Sales, Finance, Accounting, Asset Management, Notifications, Reporting, and Workflow Automation.

Designed using a scalable layered architecture, AMDOX ERP enables organizations to efficiently manage employees, customers, suppliers, procurement processes, inventory, sales, finance, and assets while maintaining complete tenant-level data isolation through Multi-Tenant Architecture and Role-Based Access Control (RBAC).

---

# 🌟 Features

- Multi-Tenant Architecture
- JWT Authentication
- Refresh Token Authentication
- Role-Based Access Control (RBAC)
- Employee Self Service (ESS)
- Secure REST APIs
- Email Automation
- Workflow Automation
- Customer Portal
- Invoice Payment Portal
- Dashboard
- Notifications
- Audit Logs
- PDF Reports
- Responsive User Interface

---

# 🏢 Human Resource Management (HR)

The Human Resource Management module simplifies employee lifecycle management, attendance tracking, payroll processing, and leave approvals.

## Modules

- Employee Management
- Department Management
- Attendance Management
- Leave Management
- Leave Approval Workflow
- Salary Structure Management
- Payroll Generation
- Payroll Approval
- Employee Self Service (ESS)
- Employee Profile

## HR Workflow

```
Department Created
        │
        ▼
Employee Added
        │
        ▼
Attendance Recorded
        │
        ▼
Leave Request Submitted
        │
        ▼
Manager Approval
        │
        ▼
Salary Structure Assigned
        │
        ▼
Payroll Generated
        │
        ▼
Payroll Approved
        │
        ▼
Salary Paid
```

---

# 📦 Procurement & Inventory Management

The Procurement module manages purchasing activities while the Inventory module maintains stock availability and warehouse operations.

## Procurement Modules

- Supplier Management
- Purchase Requests
- Purchase Request Approval
- Purchase Orders
- Goods Receipt Notes (GRN)

## Inventory Modules

- Inventory Items
- Stock Movement
- Asset Management

## Procurement Workflow

```
Inventory Low Stock
          │
          ▼
Purchase Request Created
          │
          ▼
Admin Approval
          │
          ▼
Purchase Order Generated
          │
          ▼
Supplier Receives Order
          │
          ▼
Supplier Delivers Goods
          │
          ▼
Goods Receipt Note (GRN)
          │
          ▼
Inventory Quantity Updated
          │
          ▼
Assets Assigned to Employees (Optional)
```

### Procurement Module Explanation

The procurement system ensures that inventory shortages are handled efficiently.

- Employees create Purchase Requests whenever inventory falls below required levels.
- Managers or administrators review and approve the requests.
- Approved requests automatically generate Purchase Orders.
- Suppliers receive Purchase Orders.
- Once goods arrive, a Goods Receipt Note (GRN) is generated.
- Inventory quantities are automatically updated after successful receipt.
- Assets purchased from inventory can later be assigned to employees.

---

# 📦 Inventory Management

Inventory Management maintains stock records for all products and materials.

### Features

- Add Inventory Items
- Edit Inventory
- Delete Inventory
- Monitor Available Quantity
- Unit Price Tracking
- Stock Movement History
- Automatic Stock Updates after GRN

### Inventory Workflow

```
Inventory Created
       │
       ▼
Purchase Request
       │
       ▼
Purchase Order
       │
       ▼
Goods Receipt
       │
       ▼
Stock Updated
       │
       ▼
Sales Order
```

---

# 🤝 Customer Relationship Management (CRM)

The CRM module manages customer onboarding and quotation generation.

## Modules

- Customer Invitation
- Customer Registration
- Customer Management
- Quotations

### CRM Workflow

```
Admin Invites Customer
         │
         ▼
Invitation Email Sent
         │
         ▼
Customer Registration
         │
         ▼
Customer Profile Created
         │
         ▼
Quotation Created
         │
         ▼
Quotation Email Sent
         │
         ▼
Customer Reviews Quotation
```

### CRM Module Explanation

The CRM module digitizes customer onboarding.

Customers receive secure invitation links through email.

After registration, customers become available for:

- Quotations
- Sales Orders
- Invoices
- Payments

This eliminates manual customer creation and provides secure customer onboarding.

---

# 💼 Sales Management

The Sales module manages the complete order-to-cash lifecycle.

## Modules

- Quotations
- Sales Orders
- Invoices
- Payments

### Sales Workflow

```
Customer Registered
        │
        ▼
Quotation Created
        │
        ▼
Quotation Sent
        │
        ▼
Customer Reviews Quotation
        │
        ├───────────────┐
        ▼               ▼
 Accepted          Rejected
        │
        ▼
Sales Order Created
        │
        ▼
Invoice Generated
        │
        ▼
Invoice Email Sent
        │
        ▼
Customer Reviews Invoice
        │
        ├───────────────┐
        ▼               ▼
Pay Now         Not Interested
        │               │
        ▼               ▼
Payment      Invoice Declined
Created
        │
        ▼
Invoice Marked Paid
        │
        ▼
Finance Updated
```

### Sales Module Explanation

The Sales module automates the complete sales lifecycle.

1. A quotation is created for a registered customer.
2. The quotation is emailed automatically.
3. Customers can securely review quotations using a public review page.
4. If accepted, a Sales Order is automatically generated.
5. An Invoice is created from the Sales Order.
6. The invoice is emailed to the customer.
7. Customers can either:

- Pay the invoice online
- Decline the invoice by selecting "Not Interested"

If payment succeeds:

- Payment record is created
- Invoice status becomes PAID
- Finance records are updated

If declined:

- Invoice status becomes DECLINED
- Notification is created
- Administrator can resend invoice later

---

# 💰 Finance & Accounting

Finance manages every financial transaction occurring within the ERP.

## Modules

- Accounts
- Transactions
- Journal Entries
- Expenses
- Payments

### Finance Workflow

```
Sales Order
      │
      ▼
Invoice
      │
      ▼
Payment
      │
      ▼
Transaction
      │
      ▼
Journal Entry
      │
      ▼
Financial Reports
```

### Finance Module Explanation

Every successful payment automatically updates the accounting records.

The Finance module provides:

- Ledger maintenance
- Transaction tracking
- Expense recording
- Journal entries
- Financial reporting

---

# 💻 Asset Management

Assets purchased through procurement can be assigned to employees.

## Features

- Asset Registration
- Asset Assignment
- Asset Return
- Asset History

Workflow

```
Inventory
     │
     ▼
Asset Created
     │
     ▼
Assign Asset
     │
     ▼
Employee Uses Asset
     │
     ▼
Return Asset
```

---

# 🔔 Notification System

Automatic notifications are generated whenever important events occur.

Examples include:

- Payroll Generated
- Payroll Paid
- Purchase Request Created
- Purchase Request Approved
- Purchase Order Created
- Goods Received
- Customer Invitation Sent
- Quotation Sent
- Quotation Accepted
- Quotation Rejected
- Sales Order Created
- Invoice Generated
- Invoice Sent
- Invoice Paid
- Invoice Declined
- Payment Created
- Asset Assigned
- Asset Returned

Notifications help users stay informed without manually checking every module.

---

# ⚙ Workflow Automation

AMDOX ERP automatically connects different modules.

```
HR
 │
 ├── Attendance
 ├── Leave
 └── Payroll

──────────────────────────

Procurement
 │
 ├── Purchase Request
 ├── Purchase Order
 ├── GRN
 └── Inventory

──────────────────────────

CRM
 │
 ├── Customer Invitation
 ├── Customer Registration
 └── Quotations

──────────────────────────

Sales
 │
 ├── Sales Orders
 ├── Invoices
 ├── Payments
 └── Finance

──────────────────────────

Assets
 │
 ├── Assignment
 └── Return

──────────────────────────

Notifications
Reports
Dashboard
```

---

# 🔐 Authentication & Security

Security features include:

- JWT Authentication
- Refresh Token Authentication
- Password Hashing using bcrypt
- Multi-Tenant Data Isolation
- Role-Based Access Control (RBAC)
- Protected REST APIs
- Input Validation using Zod
- Audit Logging
- Secure Password Reset via Email

---

# 🏗 Backend Architecture

The backend follows a scalable layered architecture.

```
Frontend
    │
    ▼
Routes
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

Each layer has a single responsibility, making the application easier to maintain, test, and extend.

---

# 🛠 Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Sonner

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Nodemailer

## Database

- PostgreSQL

---

# 📁 Project Structure

```
AMDOX ERP
│
├── 📄 README.md
├── 📄 ARCHITECTURE.md
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 .gitignore
│
├── 📂 docs/
│
├── 📂 backend/
│   │
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 tsconfig.json
│   ├── 📄 prisma.config.ts
│   ├── 📄 .env
│   ├── 📄 .gitignore
│   │
│   ├── 📂 prisma/
│   │   ├── 📄 schema.prisma
│   │   └── 📂 migrations/
│   │
│   ├── 📂 uploads/
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📄 server.ts
│   │   │
│   │   ├── 📂 config/
│   │   │
│   │   ├── 📂 controllers/
│   │   │
│   │   ├── 📂 services/
│   │   │
│   │   ├── 📂 repositories/
│   │   │
│   │   ├── 📂 routes/
│   │   │
│   │   ├── 📂 middleware/
│   │   │
│   │   ├── 📂 validators/
│   │   │
│   │   ├── 📂 types/
│   │   │
│   │   ├── 📂 utils/
│   │   │
│   │   ├── 📂 templates/
│   │   │
│   │   ├── 📂 socket/
│   │   │
│   │   └── 📂 generated/
│   │
│   └── 📂 node_modules/
│
├── 📂 frontend/
│   │
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 vite.config.ts
│   ├── 📄 tsconfig.json
│   ├── 📄 tsconfig.app.json
│   ├── 📄 tsconfig.node.json
│   ├── 📄 eslint.config.js
│   ├── 📄 components.json
│   ├── 📄 index.html
│   ├── 📄 README.md
│   ├── 📄 .env
│   ├── 📄 .gitignore
│   │
│   ├── 📂 public/
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📄 main.tsx
│   │   ├── 📄 App.tsx
│   │   ├── 📄 App.css
│   │   ├── 📄 index.css
│   │   │
│   │   ├── 📂 api/
│   │   │
│   │   ├── 📂 assets/
│   │   │
│   │   ├── 📂 components/
│   │   │
│   │   ├── 📂 config/
│   │   │
│   │   ├── 📂 contexts/
│   │   │
│   │   ├── 📂 hooks/
│   │   │
│   │   ├── 📂 lib/
│   │   │
│   │   ├── 📂 pages/
│   │   │
│   │   ├── 📂 routes/
│   │   │
│   │   ├── 📂 schemas/
│   │   │
│   │   └── 📂 services/
│   │
│   └── 📂 node_modules/
│
└── 📂 node_modules/
```

---
# 🚀 Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/Rajeevreddy-2006/enterprise-cloud-erp-suite.git
cd enterprise-cloud-erp-suite
```

---

# 📦 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Create `.env`

Create a `.env` file inside the **backend** directory.

```env
# ==========================================
# Server
# ==========================================
PORT=5000
NODE_ENV=development

# ==========================================
# Database
# ==========================================
DATABASE_URL=your_postgresql_database_url

# ==========================================
# JWT
# ==========================================
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ==========================================
# Frontend
# ==========================================
FRONTEND_URL=http://localhost:5173

# ==========================================
# Email Configuration
# ==========================================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# ==========================================
# Cloudinary
# ==========================================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Prisma Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

(Optional) Seed the database

```bash
npx prisma db seed
```

---

## Start Backend

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

Backend runs at

```
http://localhost:5000
```

Swagger Documentation

```
http://localhost:5000/api-docs
```

---

# 💻 Frontend Setup

Navigate to the frontend folder

```bash
cd ../frontend
```

Install dependencies

```bash
npm install
```

---

## Create `.env`

Create a `.env` file inside the **frontend** directory.

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🛠 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Hook Form
- TanStack Query
- Axios
- Recharts

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Role-Based Access Control (RBAC)
- Nodemailer
- Socket.IO
- Swagger API Documentation

---

# 📂 Project Structure

```
enterprise-cloud-erp-suite
│
├── backend
│   ├── prisma
│   ├── src
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# 🌐 Deployment

## Frontend

Update `.env`

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Deploy to

- Render
- Vercel
- Netlify

---

## Backend

Deploy to

- Render

Required Environment Variables

```env
DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
JWT_EXPIRES_IN
JWT_REFRESH_EXPIRES_IN

FRONTEND_URL

EMAIL_HOST
EMAIL_PORT
EMAIL_USER
EMAIL_PASSWORD

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Run Command

```bash
npx prisma migrate deploy && npm start
```

---

# ✅ Default URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

Swagger

```
http://localhost:5000/api-docs
```

---

## 🎥 Project Demo Video

Watch the complete demo of the **Enterprise Cloud ERP Suite** showcasing Authentication, HRMS, Payroll, Finance, Inventory, Procurement, Sales, Reporting, and Employee Management.

▶️ **Demo Video:**  
[📹 Watch Demo](./docs/Amdox_erp_recording.mp4)

---
# 📌 Future Enhancements

- Payment Gateway Integration (Stripe/Razorpay)
- GST & Tax Management
- AI-Powered Business Analytics
- OCR Invoice Processing
- Barcode & QR Code Inventory
- Mobile Application
- Multi-Currency Support
- Real-Time Notifications (WebSockets)
- Advanced Business Intelligence Dashboard

---

# 👨‍💻 Author

**Rajeev Reddy**

B.Tech in Computer Science & Engineering  
Indian Institute of Technology (IIT) Bhubaneswar

GitHub: https://github.com/Rajeevreddy-2006

LinkedIn: https://linkedin.com/in/rajeev-reddy

---

# 📄 License

This project is developed for educational, learning, and portfolio purposes.