import { useState } from "react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

interface Props {
    onSubmit: (data: any) => void;
    loading?: boolean;
    defaultValues?: {
        name?: string;
        description?: string;
    };
}

const departments = [
    "Human Resources",
    "Engineering",
    "Finance",
    "Accounting",
    "Sales",
    "Marketing",
    "Operations",
    "Procurement",
    "Inventory",
    "Payroll",
    "Administration",
    "IT",
    "Legal",
    "Customer Support",
    "Research & Development",
    "Quality Assurance",
    "Other"
];

const departmentDescriptions = {
    "Human Resources":
        "Manages recruitment, employee relations, training, and workforce policies.",
    "Engineering":
        "Responsible for software development, product design, and technical innovation.",
    "Finance":
        "Handles budgeting, accounting, financial planning, and reporting.",
    "Accounting":
        "Maintains financial records, audits, and compliance activities.",
    "Sales":
        "Drives revenue generation and customer acquisition efforts.",
    "Marketing":
        "Manages branding, campaigns, and market outreach strategies.",
    "Operations":
        "Oversees daily business activities and process optimization.",
    "Procurement":
        "Handles purchasing, vendor management, and sourcing activities.",
    "Inventory":
        "Manages stock levels, warehouses, and inventory movement.",
    "Payroll":
        "Processes employee salaries, deductions, and compensation.",
    "Administration":
        "Supports organizational operations and office management.",
    "IT":
        "Maintains infrastructure, systems, networks, and security.",
    "Legal":
        "Handles contracts, compliance, and legal matters.",
    "Customer Support":
        "Assists customers and resolves service issues.",
    "Research & Development":
        "Focuses on innovation, experimentation, and new initiatives.",
    "Quality Assurance":
        "Ensures products and services meet quality standards."
};

function DepartmentForm({
onSubmit,
loading,
defaultValues
}:Props) {
    const [ dept,setDept ]=useState(defaultValues?.name || "");
    const [ description,setDescription ] = useState(defaultValues?.description || "");
    const [ custom, setCustom ] = useState("");
    const submit = () => {
        const payload = {
            name: dept === "Other" ? custom : dept,
            description
        };
        console.log(payload);
        onSubmit(payload);
    };
    return (
        <div className="space-y-5">
            <select
                value={dept}
                onChange={(e) => {
                    const value = e.target.value;
                    setDept(value);
                    setDescription(
                        departmentDescriptions[value as keyof typeof departmentDescriptions] || ""
                    );
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white"
            >
                <option value="">
                    Select Department
                </option>
                {
                    departments.map(d => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    )
                    )
                }
            </select>
            {
                dept === "Other"
                &&
                (
                    <Input
                        placeholder="Department Name"
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)} />
                )
            }

            <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-900 border-slate-700"
            />
            <div className="flex justify-center">
                <Button disabled={loading} onClick={submit} >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );
}

export default DepartmentForm;