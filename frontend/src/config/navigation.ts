import { Users, Building2, Calendar, Package, ShoppingCart, DollarSign, FileText, ClipboardList } from "lucide-react";
import { CalendarDays, Wallet, BadgeIndianRupee } from "lucide-react";

export const navigation = [
    { title:"Dashboard", path:"/dashboard", icon:ClipboardList },
    { title:"Employees", path:"/employees", icon:Users },
    { title:"Departments", path:"/departments", icon:Building2 },
    { title:"Attendance", path:"/attendance", icon:Calendar },
    { title:"Inventory", path:"/inventory", icon:Package },
    { title:"Sales Orders", path:"/sales-orders", icon:ShoppingCart },
    { title:"Accounts", path:"/accounts", icon:DollarSign },
    { title:"Reports", path:"/reports", icon:FileText },
    { title:"Leaves", path:"/leave", icon:CalendarDays },
    { title:"Payroll", path:"/payroll", icon:Wallet },
    { title:"Salary", path:"/salary-structure", icon:BadgeIndianRupee }
];