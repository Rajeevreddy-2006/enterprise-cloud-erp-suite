import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import SalaryStructureTable from "@/components/salary/SalaryStructureTable";
import SalaryStructureDialog from "@/components/salary/SalaryStructureDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import { toast } from "sonner";

import { useSalaryStructures } from "@/hooks/salary_hooks/useSalaryStructures";
import { useCreateSalaryStructure } from "@/hooks/salary_hooks/useCreateSalaryStructure";
import { useUpdateSalaryStructure } from "@/hooks/salary_hooks/useUpdateSalaryStructure";
import { useDeleteSalaryStructure } from "@/hooks/salary_hooks/useDeleteSalaryStructure";

import type { SalaryStructure } from "@/types/salary.types";
import type { SalaryFormData } from "@/schemas/salary.schema";

import { useAuth } from "@/hooks/auth_hooks/useAuth";

function SalaryStructurePage() {
    const {
        data,
        isLoading,
        isError
    } = useSalaryStructures();

    const { user } = useAuth();

    const createSalary = useCreateSalaryStructure();
    const updateSalary = useUpdateSalaryStructure();
    const deleteSalary = useDeleteSalaryStructure();

    const salaryStructures: SalaryStructure[] = data?.data || [];

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<SalaryStructure | null>(null);

    const [search, setSearch] = useState("");

    const [
        selectedEmployee,
        setSelectedEmployee
    ] = useState<any>(null);

    const filtered =
        useMemo(() => {
            return salaryStructures.filter(
                (item) => {
                    const name =
                        `${item.employee?.firstName || ""}
                        ${item.employee?.lastName || ""}`
                            .toLowerCase();
                    return name.includes(
                        search.toLowerCase()
                    );
                }
            );
        }, [
            salaryStructures,
            search
        ]);

    const totalEmployees = salaryStructures.length;
    const averageSalary = totalEmployees
            ? Math.round(
                salaryStructures.reduce(
                    (sum, item) =>
                        sum +
                        Number(item.basicSalary),
                    0
                ) / totalEmployees
            )
            : 0;
    const configured =
        salaryStructures.filter(
            (item) => item.employee
        ).length;
    const handleSubmit = (
        values: SalaryFormData
    ) => {
        if (selected) {
            updateSalary.mutate(
                {
                    id: selected.id,
                    data: values
                },
                {
                    onSuccess() {
                        toast.success(
                            "Salary Structure updated"
                        );
                        setOpen(false);
                        setSelected(null);
                    },
                    onError: (error: any) => {
                        toast.error(
                            error.response?.data?.message ||
                            "Unable to update salary"
                        );
                    }
                }
            );
        } else {
            createSalary.mutate(
                values,
                {
                    onSuccess() {
                        toast.success(
                            "Salary Structure created"
                        );
                        setOpen(false);
                        setSelected(null);
                    },
                    onError: (error: any) => {
                        toast.error(
                            error.response?.data?.message ||
                            "Unable to create salary"
                        );
                    }
                }
            );
        }
    };
    const handleDelete = (id: string) => {
        deleteSalary.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Deleted successfully"
                    );
                },
                onError: (error: any) => {
                    toast.error(
                        error.response?.data?.message ||
                        "Unable to delete salary"
                    );
                }
            }
        );
    };
    const handleEdit = (salary: SalaryStructure) => {
        setSelected(salary);
        setOpen(true);
    };
    if (isLoading) {
        return (
            <AppLayout>
                <div className="py-20 text-center text-white">
                    Loading Salary Structures...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="py-20 text-center text-red-500">
                    Failed to load salary structures
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            Salary Structure
                        </h1>
                    </div>
                    <Button
                        onClick={() => {
                            setSelected(null);
                            setSelectedEmployee(null);
                            setOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Structure
                    </Button>
                </div>
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Employees
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {totalEmployees}
                        </h2>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Avg Salary
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            ₹{averageSalary.toLocaleString()}
                        </h2>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Structures
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {salaryStructures.length}
                        </h2>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Configured
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {configured}
                        </h2>
                    </div>
                </div>
                <Input
                    placeholder="Search Employee"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                />
                <SalaryStructureTable
                    salaryStructures={filtered}
                    currentUser={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <SalaryStructureDialog
                    open={open}
                    onOpenChange={setOpen}
                    employee={selectedEmployee}
                    defaultValues={selected}
                    loading={
                        createSalary.isPending ||
                        updateSalary.isPending
                    }
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default SalaryStructurePage;