import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import DepartmentTable from "@/components/departments/DepartmentTable";
import DepartmentDialog from "@/components/departments/DepartmentDialog";

import { useDepartments } from "@/hooks/department_hooks/useDepartments";
import { useCreateDepartment } from "@/hooks/department_hooks/useCreateDepartment";
import { useUpdateDepartment } from "@/hooks/department_hooks/useUpdateDepartment";
import { useDeleteDepartment } from "@/hooks/department_hooks/useDeleteDepartment";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { toast } from "sonner";

function DepartmentPage() {
    const { data, isLoading, isError } = useDepartments();
    const createDepartment = useCreateDepartment();
    const updateDepartment = useUpdateDepartment();
    const deleteDepartment = useDeleteDepartment();
    const departments = data?.data || [];
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const filteredDepartments = useMemo(() => {
        return departments.filter(
            (department: any) =>
                department.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );
    }, [
        departments,
        search
    ]);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedDepartments = filteredDepartments.slice(
            start,
            end
        );
    const handleSubmit = (values: any) => {
        console.log(values);
        if (selected) {
            updateDepartment.mutate(
                {
                    id: selected.id,
                    data: values
                },
                {
                    onSuccess() {
                        toast.success(
                            "Department updated successfully"
                        );
                        setOpen(false);
                        setSelected(null);
                    },
                    onError(error: any) {
                        console.log(
                            error.response?.data
                        );
                        toast.error(
                            error.response?.data?.message ||
                            "Unable to update department"
                        );
                    }
                }
            );
        } else {
            createDepartment.mutate(
                values,
                {
                    onSuccess() {
                        toast.success(
                            "Department created successfully"
                        );
                        setOpen(false);
                        setSelected(null);
                    },
                    // onError(error: any) {
                    //     console.log(
                    //         error.response?.data
                    //     );
                    //     toast.error(
                    //         error.response?.data?.message ||
                    //         "Unable to create department"
                    //     );
                    // }
                    onError(error:any){

console.log(
error.response?.data
);

toast.error(

error.response?.data?.message ||

"Unable to create department"

);

}
                }
            );
        }
    };
    const handleDelete = (id: string) => {
        deleteDepartment.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Department deleted successfully"
                    );
                },
                onError(error: any) {
                    toast.error(
                        error.response?.data?.message ||
                        "Unable to delete department"
                    );
                }
            }
        );
    };
    if (isLoading) {
        return (
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Departments...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load departments
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Departments
                    </h1>
                    <Button className="text-white"
                        onClick={() => {
                            setSelected(null);
                            setOpen(true);
                        }}>
                        <Plus size={16} />
                        New Department
                    </Button>
                </div>
                <Input
                    placeholder="Search Department"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                {
                    filteredDepartments.length === 0?
                        (
                            <div className="text-center text-slate-400 py-10">
                                No Departments Found
                            </div>
                        ):(
                            <DepartmentTable
                                departments={
                                    paginatedDepartments
                                }
                                onEdit={(department) => {
                                    setSelected(department);
                                    setOpen(true);
                                }}
                                onDelete={
                                    handleDelete
                                }
                            />
                        )
                }
                <div className="flex gap-4">
                    <Button
                        disabled={page === 1}
                        onClick={() =>
                            setPage(
                                page - 1
                            )
                        }
                    >
                       Previous
                    </Button>
                    <Button
                        disabled={
                            end >=
                            filteredDepartments.length
                        }
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                    >
                        Next
                    </Button>
                </div>
                <DepartmentDialog
                    open={open}
                    onOpenChange={setOpen}
                    loading={
                        createDepartment.isPending ||
                        updateDepartment.isPending
                    }
                    defaultValues={selected}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default DepartmentPage;