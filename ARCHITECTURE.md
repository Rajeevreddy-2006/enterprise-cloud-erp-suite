# Enterprise Cloud ERP Suite - Architecture

## Overview

Enterprise Cloud ERP Suite is a full-stack, cloud-native, multi-tenant Enterprise Resource Planning (ERP) application developed to simplify and centralize business operations within a single platform. The application enables organizations to manage employees, departments, payroll, attendance, leave management, inventory, finance, procurement, notifications, reporting, and analytics while ensuring secure tenant isolation.

The project follows a modern layered architecture with a React frontend, Express.js backend, Prisma ORM, and PostgreSQL database. Every component is designed to be modular, scalable, maintainable, and reusable, making it suitable for both small businesses and large enterprises.

---

# High Level Architecture

```
                        ┌─────────────────────────────┐
                        │     React + TypeScript      │
                        │       Frontend (Vite)       │
                        └──────────────┬──────────────┘
                                       │
                              HTTPS REST API
                                       │
                        ┌──────────────▼──────────────┐
                        │      Express.js Server      │
                        └──────────────┬──────────────┘
                                       │
         ┌───────────────┬─────────────┼──────────────┬──────────────┐
         │               │             │              │              │
         ▼               ▼             ▼              ▼              ▼
     Middleware     Controllers     Services     Validators     Utilities
                                           │
                                           ▼
                                   Repository Layer
                                           │
                                           ▼
                                      Prisma ORM
                                           │
                                           ▼
                                   PostgreSQL Database
```

---

# Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- TanStack React Query
- Axios
- Tailwind CSS
- Lucide React Icons

### Responsibilities

The frontend is responsible for

- User Interface
- State Management
- API Communication
- Authentication Handling
- Dashboard Visualization
- Report Downloads
- Employee Self Service

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Refresh Tokens
- Nodemailer
- Zod Validation

### Responsibilities

The backend handles

- Business Logic
- Authentication
- Authorization
- Multi-Tenant Isolation
- CRUD Operations
- Report Generation
- Email Notifications
- Database Communication

---

# Layered Backend Architecture

The backend follows a clean layered architecture where every layer has a single responsibility.

```
Client Request
       │
       ▼
Routes
       │
       ▼
Authentication Middleware
       │
       ▼
Validation Middleware (Zod)
       │
       ▼
Controller
       │
       ▼
Service
       │
       ▼
Repository
       │
       ▼
Prisma ORM
       │
       ▼
PostgreSQL
```

---

## Routes Layer

Responsibilities

- Register API endpoints
- Attach middleware
- Handle authentication
- Forward request to controller

Example

```
POST /api/auth/login
GET  /api/employees
POST /api/payroll
GET  /api/reports/payroll
```

---

## Controllers

Controllers receive incoming HTTP requests.

Responsibilities

- Read request body
- Read URL parameters
- Call service layer
- Return API response
- Handle exceptions

Controllers never communicate directly with the database.

---

## Services

The Service Layer contains the complete business logic.

Responsibilities

- Validate business rules
- Calculate payroll
- Process attendance
- Generate reports
- Send invitation emails
- Create notifications
- Coordinate multiple repositories

Example

Employee Service

```
Create Employee

↓

Validate Department

↓

Validate Tenant

↓

Save Employee

↓

Create Notification

↓

Return Response
```

---

## Repository Layer

Repositories communicate directly with Prisma ORM.

Responsibilities

- CRUD Operations
- Complex Database Queries
- Pagination
- Filtering
- Searching
- Aggregation

Repositories never contain business logic.

---

# Frontend Architecture

```
Pages
   │
Reusable Components
   │
Custom Hooks
   │
React Query
   │
Axios API Client
   │
REST APIs
```

Frontend Structure

```
src/

components/
hooks/
pages/
layouts/
services/
types/
utils/
contexts/
```

---

# Authentication Architecture

Authentication is based on JWT Authentication with Refresh Token support.

```
User Login

↓

Backend validates credentials

↓

Generate Access Token

↓

Generate Refresh Token

↓

Return Tokens

↓

Store Access Token

↓

Frontend accesses APIs

↓

Axios sends Authorization Header

↓

Protected Route
```

---

## Refresh Token Flow

Whenever an access token expires

```
Protected API

↓

401 Unauthorized

↓

Axios Interceptor

↓

POST /auth/refresh

↓

Generate New Access Token

↓

Retry Original Request
```

This allows users to continue using the application without logging in again.

---

# Role Based Access Control (RBAC)

The ERP supports multiple roles.

```
SUPER_ADMIN

↓

TENANT_ADMIN

↓

HR

↓

ACCOUNTANT

↓

EMPLOYEE
```

Each role has access only to permitted modules.

Example

HR

- Employee Management
- Attendance
- Leave
- Payroll

Employee

- ESS
- Attendance
- Leave
- Profile

---

# Multi Tenant Architecture

Each organization has its own Tenant.

```
Tenant A

Employees
Departments
Payroll
Inventory
Finance

-----------------------

Tenant B

Employees
Departments
Payroll
Inventory
Finance
```

Every database query filters using Tenant ID to ensure complete data isolation.

---

# Email Sending Architecture

Employee invitations and notifications are handled through a dedicated Email Service.

```
HR

↓

Invite Employee

↓

Auth Controller

↓

Auth Service

↓

Generate Invitation Token

↓

Create Invitation URL

↓

Email Service

↓

safeSendEmail()

↓

SMTP Server (Gmail)

↓

Employee receives Invitation Email
```

---

## Email Service

The Email Service is responsible for

- Employee Invitation Emails
- Password Reset Emails
- Welcome Emails
- General Email Utility

Core methods include:

- `sendEmail()` – Sends generic emails using SMTP.
- `sendInvitation()` – Generates and sends employee invitation emails with an acceptance link.
- `sendPasswordReset()` – Sends password reset instructions.

---

## safeSendEmail Utility

The `safeSendEmail` utility wraps Nodemailer to make email delivery more reliable.

Responsibilities:

- Prevent application crashes if email sending fails.
- Log SMTP/network errors.
- Return meaningful responses to the service layer.
- Allow the application to continue processing even if an email cannot be delivered.

---

## Invitation Workflow

```
HR clicks Invite Employee

↓

Backend validates request

↓

Create User Record

↓

Generate Secure Invite Token

↓

Generate Invitation Link

↓

Store Token

↓

Send Email

↓

Employee Opens Link

↓

Set Password

↓

Account Activated

↓

Employee Login
```

The invitation mechanism ensures that only invited users can activate their accounts securely.

---

# Notification Architecture

Every important business action generates a notification.

```
Business Event

↓

Notification Service

↓

Notification Repository

↓

PostgreSQL

↓

Frontend Notification API

↓

Notification Bell
```

Notifications include

- Employee Invitations
- Payroll Generated
- Leave Approved
- Purchase Approved
- Inventory Updates

---

# API Request Lifecycle

```
React Component

↓

Axios

↓

Express Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

JSON Response

↓

Frontend Update
```

This layered request lifecycle improves maintainability, scalability, and separation of concerns.

---
---

# Core Modules

The Enterprise Cloud ERP Suite consists of multiple integrated modules that work together to automate business operations.

```
Authentication
        │
        ├──────── Employee Management
        │               │
        │               ├── Attendance
        │               ├── Leave
        │               ├── Salary Structure
        │               └── Payroll
        │
        ├──────── Finance
        │               ├── Accounts
        │               ├── Transactions
        │               └── Journal Entries
        │
        ├──────── Inventory
        │               ├── Inventory Items
        │               ├── Purchase Requests
        │               ├── Purchase Orders
        │               ├── Goods Receipt Notes
        │               └── Stock Movements
        │
        ├──────── Notifications
        ├──────── Reports
        └──────── Dashboard Analytics
```

---

# Employee Management

The Employee Management module manages the complete employee lifecycle.

## Features

- Employee Registration
- Employee Invitation
- Employee Profile
- Department Assignment
- Salary Assignment
- Employee Search
- Employee Status Management
- Employee Self Service (ESS)

### Workflow

```
Create Employee

↓

Validate Department

↓

Validate Tenant

↓

Store Employee

↓

Assign Default Role

↓

Send Invitation Email

↓

Employee Accepts Invitation

↓

Employee Login
```

---

# Attendance Management

Attendance records employee working days.

## Features

- Mark Attendance
- Daily Attendance
- Monthly Attendance
- Attendance Summary
- Present Days
- Absent Days
- Half Days
- Paid Days

Workflow

```
Employee

↓

Mark Attendance

↓

Attendance Service

↓

Attendance Repository

↓

Database

↓

Monthly Summary
```

---

# Leave Management

Employees can request leave through the ESS portal.

## Features

- Apply Leave
- Approve Leave
- Reject Leave
- Leave Balance
- Leave History

Workflow

```
Employee

↓

Apply Leave

↓

Manager / HR

↓

Approve

↓

Leave Status Updated

↓

Notification Sent
```

---

# Salary Structure

Salary structures define employee compensation.

Components include

- Basic Salary
- HRA
- Bonus
- Allowances
- Deductions

Salary structures are reusable across employees.

---

# Payroll Architecture

Payroll automatically calculates employee salaries.

```
Attendance

+

Salary Structure

+

Leave Information

↓

Payroll Calculation

↓

Allowances

↓

Deductions

↓

Net Salary

↓

Payroll Record

↓

Payslip Generation
```

Features

- Monthly Payroll
- Salary Calculation
- Deductions
- Bonus
- Payslips
- Payroll Reports

---

# Finance Module

The Finance Module manages accounting operations.

Modules include

```
Accounts

↓

Transactions

↓

Journal Entries

↓

Financial Reports
```

Features

- Account Management
- Debit/Credit Transactions
- Journal Entries
- Financial Statements
- Account Summary

---

# Inventory Management

Inventory keeps track of organizational assets and stock.

Features

- Inventory Items
- Categories
- Quantity Tracking
- Stock Status
- Stock History

---

# Procurement Workflow

The ERP follows a complete procurement lifecycle.

```
Purchase Request

↓

Approval

↓

Purchase Order

↓

Supplier

↓

Goods Receipt Note

↓

Inventory Updated

↓

Stock Movement Recorded
```

### Purchase Request

Employee requests required items.

### Purchase Order

Approved purchase request becomes a purchase order.

### Goods Receipt Note (GRN)

Inventory is updated after goods are received.

### Stock Movement

Every stock addition or removal is recorded for auditing.

---

# Reports

The application supports automated report generation.

Supported Reports

- Employee Report
- Attendance Report
- Payroll Report
- Financial Report
- Inventory Report

Formats

- PDF
- Excel

```
Database

↓

Report Service

↓

PDF Generator

↓

Excel Generator

↓

Download
```

---

# Dashboard Analytics

Dashboard provides organization-wide insights.

Statistics include

- Total Employees
- Departments
- Attendance
- Active Payrolls
- Leave Requests
- Inventory Count
- Financial Summary
- Notifications

Dashboard data is aggregated using optimized Prisma queries.

---

# Database Design

The application uses PostgreSQL with Prisma ORM.

Main Models

```
Tenant
│
├── User
├── Department
├── Employee
├── Attendance
├── Leave
├── Salary Structure
├── Payroll
├── Notification
├── Account
├── Transaction
├── Journal Entry
├── Inventory Item
├── Purchase Request
├── Purchase Order
├── Goods Receipt Note
└── Stock Movement
```

Relationships are maintained through Prisma schema definitions.

---

# Folder Structure

```
backend/

src/
│
├── config/
├── controllers/
├── middleware/
├── repositories/
├── routes/
├── services/
├── validators/
├── utils/
├── types/
├── generated/
└── server.ts

prisma/

frontend/

src/
│
├── components/
├── pages/
├── hooks/
├── services/
├── layouts/
├── contexts/
├── types/
├── utils/
└── App.tsx
```

---

# Security

The application implements enterprise-level security.

## Authentication

- JWT Access Token
- Refresh Token

## Authorization

- Role Based Access Control (RBAC)

## Validation

- Zod Validation

## Password Security

- bcrypt Password Hashing

## API Security

- Protected Routes
- Tenant Isolation
- Secure HTTP Headers
- CORS
- Environment Variables

---

# API Communication

```
React Component

↓

Axios

↓

REST API

↓

Express

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Prisma ORM

↓

PostgreSQL

↓

JSON Response

↓

React Query Cache Updated
```

---

# Deployment Architecture

```
                 Users
                   │
                   ▼
        React Frontend (Render)
                   │
            HTTPS REST API
                   │
                   ▼
        Express Backend (Render)
                   │
              Prisma ORM
                   │
                   ▼
          PostgreSQL Database
```

Environment Variables

Frontend

- VITE_API_URL

Backend

- DATABASE_URL
- JWT_SECRET
- JWT_REFRESH_SECRET
- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USER
- EMAIL_PASSWORD
- FRONTEND_URL

---

# Scalability

The architecture supports scalability through

- Layered Architecture
- Repository Pattern
- Modular Components
- Prisma ORM
- TypeScript
- Multi-Tenant Design
- RESTful APIs
- Reusable Services
- Optimized Database Queries

---

# Future Enhancements

Future modules planned for the ERP include

- Asset Management
- CRM
- Sales Management
- Customer Portal
- Vendor Portal
- Mobile Application
- Real-Time Notifications
- AI Analytics
- Business Intelligence Dashboard
- CI/CD Pipeline
- Kubernetes Deployment
- Docker Support

---

# Conclusion

The Enterprise Cloud ERP Suite is designed as a scalable, secure, and modular enterprise application that streamlines organizational workflows through an integrated platform. By combining a React frontend, Express.js backend, Prisma ORM, and PostgreSQL, the system delivers efficient business process management across HR, Payroll, Finance, Inventory, Procurement, Reporting, and Employee Self-Service.

The layered architecture, JWT-based authentication, Role-Based Access Control (RBAC), multi-tenant isolation, centralized email services, automated reporting, and modular design ensure that the platform remains maintainable, extensible, and production-ready. This architecture enables organizations to manage their operations efficiently while providing a strong foundation for future expansion with advanced enterprise modules and cloud-native deployment.