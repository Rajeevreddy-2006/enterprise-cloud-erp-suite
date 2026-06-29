import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SalaryStructureStats from "@/components/salary/SalaryStructureStats";
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

function SalaryStructurePage() {
    const { data } = useSalaryStructures();
    const createSalary = useCreateSalaryStructure();
    const updateSalary = useUpdateSalaryStructure();
    const deleteSalary = useDeleteSalaryStructure();
    const [ open,setOpen ] = useState(false);
    const [ search,setSearch ] = useState("");
    const [ selected,setSelected ] = useState<SalaryStructure | null>(null);
    const salaryStructures = data?.data || [];
    const filtered =
        salaryStructures.filter(
            (item: SalaryStructure) => {
                const name = `${item.employee?.firstName} ${item.employee?.lastName}`.toLowerCase();
                return name.includes(
                    search.toLowerCase()
                );
            }
        );
    const handleSubmit = (values: SalaryFormData) => {
        if (selected) {
            updateSalary.mutate(
                {
                    id: selected.id,
                    data: values
                },
                {
                    onSuccess() {
                        toast.success("Updated");
                        setOpen(false);
                    }
                }
            );
        }else{
            createSalary.mutate(
                values,
                {
                    onSuccess() {
                        toast.success("Created");
                        setOpen(false);
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
                    toast.success("Deleted");
                }
            }
        );
    };
    const handleEdit = (salary: SalaryStructure) => {
        setSelected(salary);
        setOpen(true);
    };
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-white"> Salary Structure </h1>
                    <Button onClick={() => { setSelected(null); setOpen(true); }}> <Plus size={16} /> Add Structure </Button>
                </div>
                <SalaryStructureStats salaryStructures={salaryStructures} />
                <Input
                    placeholder="Search Employee"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />
                <SalaryStructureTable
                    salaryStructures={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <SalaryStructureDialog
                    open={open}
                    onOpenChange={setOpen}
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