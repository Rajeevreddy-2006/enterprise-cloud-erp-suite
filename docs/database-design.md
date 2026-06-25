# Amdox ERP Database Design

## Core Entities

1. Tenant
2. User
3. Role
4. Employee
5. Department
6. InventoryItem
7. PurchaseOrder
8. Account
9. Transaction
10. JournalEntry
11. Notification

## Relationships

Tenant
 ├── Users
 ├── Employees
 ├── InventoryItems
 ├── PurchaseOrders
 └── Notifications

User
 ├── Roles

Department
 ├── Employees

PurchaseOrder
 ├── InventoryItems

Transaction
 ├── JournalEntries