import AppLayout from "@/components/layout/AppLayout";

import {
    Users,
    Building2,
    Boxes,
    ShoppingCart,
    FileText,
    Receipt,
    CreditCard,
    Calculator,
    BarChart3,
    ShieldCheck,
    Bell,
    ClipboardList,
    ArrowRight,
    User,
    CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function DashboardPage() {

    const modules = [
        {
            icon: Users,
            title: "Human Resources",
            description:
                "Manage employees, attendance, departments, leave approvals, payroll and employee self-service.",
        },
        {
            icon: Building2,
            title: "Customer Management",
            description:
                "Manage customers, quotations, sales orders and build stronger customer relationships.",
        },
        {
            icon: Boxes,
            title: "Inventory",
            description:
                "Track products, stock levels, assets, procurement and warehouse operations.",
        },
        {
            icon: ShoppingCart,
            title: "Sales",
            description:
                "Generate quotations, process sales orders, invoices and customer transactions.",
        },
        {
            icon: Calculator,
            title: "Finance",
            description:
                "Handle accounts, journal entries, payments and complete financial management.",
        },
        {
            icon: BarChart3,
            title: "Reports",
            description:
                "Generate PDF & Excel reports with real-time business insights and analytics.",
        },
    ];

    return (

        <AppLayout>

            <div className="space-y-10">

                {/* Hero */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900 px-10 py-20 text-center">

                    <h1 className="text-6xl font-extrabold tracking-wide text-white">

                        WELCOME TO

                    </h1>

                    <h2 className="mt-4 text-7xl font-black text-blue-500">

                        AMDOX ERP

                    </h2>

                    <p className="mt-6 text-2xl text-slate-300">

                        Enterprise Resource Planning Platform

                    </p>

                    <p className="mt-3 text-lg text-slate-400">

                        One Platform • One Database • Complete Business Management

                    </p>

                </section>

                {/* About */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10">

                    <h2 className="text-3xl font-bold text-white">

                        About AMDOX ERP

                    </h2>

                    <p className="mt-6 text-lg leading-9 text-slate-300">

                        AMDOX ERP is a modern Enterprise Resource Planning platform
                        built to simplify and automate every major business process
                        within an organization. From Human Resources and Customer
                        Relationship Management to Inventory, Procurement,
                        Sales, Finance, Accounting, Payroll and Reporting,
                        every department operates through one secure and
                        centralized platform.

                    </p>

                    <p className="mt-5 text-lg leading-9 text-slate-300">

                        By eliminating disconnected software and manual
                        workflows, AMDOX ERP improves collaboration,
                        increases productivity, reduces operational costs,
                        and provides real-time visibility into business
                        operations, enabling organizations to make faster
                        and smarter decisions.

                    </p>

                </section>

                {/* Workflow */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10">

                    <h2 className="text-3xl font-bold text-white">

                        Business Workflow

                    </h2>

                    <p className="mt-3 text-slate-400">

                        AMDOX ERP connects every department through one continuous workflow.

                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-center">

                        <div className="flex flex-col items-center">
                            <Users className="h-10 w-10 text-blue-400"/>
                            <span className="mt-2 text-white">HR</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <Building2 className="h-10 w-10 text-green-400"/>
                            <span className="mt-2 text-white">CRM</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <Boxes className="h-10 w-10 text-yellow-400"/>
                            <span className="mt-2 text-white">Inventory</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <FileText className="h-10 w-10 text-orange-400"/>
                            <span className="mt-2 text-white">Quotation</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <Receipt className="h-10 w-10 text-cyan-400"/>
                            <span className="mt-2 text-white">Invoice</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <CreditCard className="h-10 w-10 text-pink-400"/>
                            <span className="mt-2 text-white">Payment</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <Calculator className="h-10 w-10 text-purple-400"/>
                            <span className="mt-2 text-white">Accounting</span>
                        </div>

                        <ArrowRight className="text-slate-500"/>

                        <div className="flex flex-col items-center">
                            <BarChart3 className="h-10 w-10 text-emerald-400"/>
                            <span className="mt-2 text-white">Reports</span>
                        </div>

                    </div>

                </section>

                {/* Modules */}

                <section>

                    <h2 className="mb-8 text-3xl font-bold text-white">

                        Platform Modules

                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {
                            modules.map((module) => {

                                const Icon = module.icon;

                                return (

                                    <div
                                        key={module.title}
                                        className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                                    >

                                        <Icon className="h-10 w-10 text-blue-400"/>

                                        <h3 className="mt-5 text-xl font-semibold text-white">

                                            {module.title}

                                        </h3>

                                        <p className="mt-3 leading-7 text-slate-400">

                                            {module.description}

                                        </p>

                                    </div>

                                );

                            })
                        }

                    </div>

                </section>

                {/* Features */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10">

                    <h2 className="text-3xl font-bold text-white">

                        Why Choose AMDOX ERP?

                    </h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <div className="flex items-center gap-3 text-slate-300">
                            <ShieldCheck className="text-green-400"/>
                            Secure Access
                        </div>

                        <div className="flex items-center gap-3 text-slate-300">
                            <Bell className="text-blue-400"/>
                            Notifications
                        </div>

                        {/* <div className="flex items-center gap-3 text-slate-300">
                            <ClipboardList className="text-orange-400"/>
                            Audit Logs
                        </div> */}

                        <div className="flex items-center gap-3 text-slate-300">
                            <BarChart3 className="text-purple-400"/>
                            Business Reports
                        </div>

                    </div>

                </section>

                {/* Quick Actions */}

                {/* <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10">

                    <h2 className="text-3xl font-bold text-white">

                        Quick Actions

                    </h2>

                    <div className="mt-8 flex flex-wrap gap-5">

                        <Button asChild>

                            <Link to="/profile">

                                <User className="mr-2 h-4 w-4"/>

                                View Profile

                            </Link>

                        </Button>

                        <Button variant="outline" asChild>

                            <Link to="/leave/apply">

                                <CalendarDays className="mr-2 h-4 w-4"/>

                                Apply Leave

                            </Link>

                        </Button>

                    </div>

                </section> */}

            </div>

        </AppLayout>

    );

}

export default DashboardPage;