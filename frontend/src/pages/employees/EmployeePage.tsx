import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeModal from "@/components/employees/EmployeeModal";

import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import { useCreateEmployee } from "@/hooks/employee_hooks/useCreateEmployee";
import { useUpdateEmployee } from "@/hooks/employee_hooks/useUpdateEmployee";
import { useDeleteEmployee } from "@/hooks/employee_hooks/useDeleteEmployee";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

function EmployeePage() {
    const {data,isLoading,isError} = useEmployees();
    const createEmployee = useCreateEmployee();
    const updateEmployee = useUpdateEmployee();
    const deleteEmployee = useDeleteEmployee();
    const employees = data?.data || [];
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const filteredEmployees = useMemo(() => {
        return employees.filter(
            (employee: any) => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes( search.toLowerCase() )
        );
    },
        [employees, search]
    );
    const start =(page - 1)*limit;
    const end = start+limit;
    const paginatedEmployees = filteredEmployees.slice(start,end);
    const handleCreate = () => {
        setSelectedEmployee(null);
        setOpen(true);
    };

    const handleEdit = (employee: any) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteEmployee.mutate(id,
            {
                onSuccess() {
                    toast.success("Employee deleted successfully");
                },
                onError() {
                    toast.error("Unable to delete employee");
                }
            }
        );
    };

    const handleSubmit = (values: any) => {
        if (selectedEmployee) {
            updateEmployee.mutate(
                {
                    id: selectedEmployee.id,
                    data: values
                },
                {
                    onSuccess() {
                        toast.success("Employee updated successfully");
                    },
                    onError() {
                        toast.error("Unable to update employee");
                    }
                }
            );
        }
        else {
            createEmployee.mutate(
                values,
                {
                    onSuccess() {
                        toast.success("Employee created successfully");
                    },
                    onError() {
                        toast.error("Unable to create employee");
                    }
                }
            );
        }
        setOpen(false);
        setSelectedEmployee(null);
    };
    if (isLoading) {
        return (
            <AppLayout>
                <div className="text-white text-center py-20"> Loading Employees... </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className=" text-red-500 text-center py-20"> Failed to load employees </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white"> Employees </h1>
                    <Button onClick={handleCreate}> Add Employee </Button>
                </div>
                <Input
                    placeholder="Search employee"
                    value={search}
                    onChange={
                        (e) => setSearch( e.target.value )
                    }
                />
                {
                    filteredEmployees.length === 0?
                        ( <div className="text-center text-slate-400 py-10"> No Employees Found</div> )
                        :
                        ( <EmployeeTable employees={ paginatedEmployees } onEdit={ handleEdit } onDelete={ handleDelete } /> )
                }
                <div className="flex gap-4">
                    <Button
                        disabled={ page === 1 }
                        onClick={() =>
                            setPage( page - 1 )
                        }
                    > Previous </Button>
                    <Button
                        disabled={
                            end >= filteredEmployees.length
                        }
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                    > Next </Button>
                </div>
                <EmployeeModal
                    open={open}
                    setOpen={setOpen}
                    employee={selectedEmployee}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}
export default EmployeePage;