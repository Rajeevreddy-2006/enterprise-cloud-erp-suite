import {
    LayoutDashboard,

    Users,
    UserRound,
    UserPlus,

    Building2,

    Package,
    Boxes,
    Truck,
    ShoppingCart,

    DollarSign,
    Wallet,
    BadgeIndianRupee,
    Receipt,
    BookOpen,

    ClipboardCheck,
    FileSpreadsheet,
    FileText,

    Bell,
    Settings,
} from "lucide-react";

export const navigation = [

    // =====================================================
    // HOME
    // =====================================================

    {
        title: "Welcome",
        path: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "Tenants",
        path: "/tenants",
        icon: Building2,
    },

    // =====================================================
    // HUMAN RESOURCES
    // =====================================================

    {
        title: "Employees",
        path: "/employees",
        icon: Users,
    },

    {
        title: "Departments",
        path: "/departments",
        icon: Building2,
    },

    {
        title: "Leave Approvals",
        path: "/leave-approvals",
        icon: ClipboardCheck,
    },

    {
        title: "Salary Structure",
        path: "/salary-structure",
        icon: BadgeIndianRupee,
    },

    {
        title: "Payroll Approval",
        path: "/payroll-approvals",
        icon: Wallet,
    },

    // =====================================================
    // FINANCE
    // =====================================================

    {
        title: "Accounts",
        path: "/accounts",
        icon: DollarSign,
    },

    {
        title: "Transactions",
        path: "/transactions",
        icon: Receipt,
    },

    {
        title: "Journal Entries",
        path: "/journal-entries",
        icon: BookOpen,
    },

    {
        title: "Expenses",
        path: "/expenses",
        icon: Receipt,
    },

    // =====================================================
    // PROCUREMENT
    // =====================================================

    {
        title: "Inventory",
        path: "/inventory",
        icon: Package,
    },

    {
        title: "Suppliers",
        path: "/suppliers",
        icon: Truck,
    },

    {
        title: "Purchase Requests",
        path: "/purchase-requests",
        icon: ShoppingCart,
    },

    {
        title: "Purchase Orders",
        path: "/purchase-orders",
        icon: ShoppingCart,
    },

    {
        title: "GRN",
        path: "/grn",
        icon: ClipboardCheck,
    },

    // =====================================================
    // CUSTOMER RELATIONSHIP MANAGEMENT
    // =====================================================

    {
        title: "Customer Invitations",
        path: "/customer-invitations",
        icon: UserPlus,
    },

    {
        title: "Customers",
        path: "/customers",
        icon: UserRound,
    },

    {
        title: "Quotations",
        path: "/quotations",
        icon: FileSpreadsheet,
    },

    // =====================================================
    // SALES
    // =====================================================

    {
        title: "Sales Orders",
        path: "/sales-orders",
        icon: ShoppingCart,
    },

    {
        title: "Invoices",
        path: "/invoices",
        icon: FileText,
    },

    {
        title: "Payments",
        path: "/payments",
        icon: DollarSign,
    },

    // =====================================================
    // ASSET MANAGEMENT
    // =====================================================

    {
        title: "Assets",
        path: "/assets",
        icon: Boxes,
    },

    // =====================================================
    // SYSTEM
    // =====================================================

    {
        title: "Notifications",
        path: "/notifications",
        icon: Bell,
    },

    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },

];