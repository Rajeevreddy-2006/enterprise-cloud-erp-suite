import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import EmployeeTable from "@/components/employees/EmployeeTable";
import InviteEmployeeDialog from "@/components/employees/InviteEmployeeDialog";

import { useUsers } from "@/hooks/user_hooks/useUsers";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import { useInviteUser } from "@/hooks/auth_hooks/useInviteUser";
import { useResendInvite } from "@/hooks/auth_hooks/useResendInvite";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import { toast } from "sonner";

import type { InviteFormData } from "@/schemas/invite.schema";

import { useDeleteUser } from "@/hooks/user_hooks/useDeleteUser";

import SalaryStructureDialog from "@/components/salary/SalaryStructureDialog";

import { useAuth } from "@/hooks/auth_hooks/useAuth";

import { useCreateSalaryStructure } from "@/hooks/salary_hooks/useCreateSalaryStructure";

import { useDepartments } from "@/hooks/department_hooks/useDepartments";

function EmployeePage() {
    const {
        data,
        isLoading,
        isError
    } = useEmployees();
    const invite = useInviteUser();
    const resend = useResendInvite();
    const createSalary = useCreateSalaryStructure();
    // const users = data?.data || [];
    const { user } = useAuth();
    const employees = data?.data || [];
    console.log(employees);
    const [open,setOpen] = useState(false);
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const [ salaryOpen,setSalaryOpen ] = useState(false);
    const [ selectedEmployee,setSelectedEmployee ] = useState<any>(null);
    const limit = 10;
    const { data: departmentsData, isLoading: departmentsLoading } = useDepartments();
    const departments = departmentsData ?? [];
    const filtered = useMemo(()=>{
        return employees.filter(
            (employee: any) => {
                const fullName =`${employee.firstName}${employee.lastName}`
                        .toLowerCase();
                return fullName.includes(
                    search.toLowerCase()
                );
            }
        );
    }, [employees, search]);
    const handleInvite = (values: InviteFormData) => {
        invite.mutate(
            values,
            {
                onSuccess() {
                    toast.success(
                        "Invitation sent successfully"
                    );
                    setOpen(false);
                },
                onError(error:any) {
                    toast.error(
                        error?.response?.data?.message ||
                        "Unable to send invitation"
                    );
                }
            }
        );
    };
    const handleResend = (id:string) => {
        resend.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Invitation resent successfully"
                    );
                },
                onError() {
                    toast.error(
                        "Unable to resend invitation"
                    );
                }
            }
        );
    };
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start,end);
    const [ selectedUser,setSelectedUser ] = useState<any>(null);
    const [ editOpen,setEditOpen ] = useState(false);
    const deleteUser = useDeleteUser();
    const handleEdit=(employee:any)=>{
        setSelectedUser(employee);
        setEditOpen(true);
    };
    const handleDelete=(id:string)=>{
        deleteUser.mutate(
            id,
            {
                onSuccess(){
                    toast.success(
                        "Employee deleted"
                    );
                }
            }
        );
    };
    if(isLoading){
        return(
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Employees...
                </div>
            </AppLayout>
        );
    }
    if(isError){
        return(
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load employees
                </div>
            </AppLayout>
        );
    }
    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Employees
                    </h1>
                    <Button className="text-white"
                        onClick={() => setOpen(true)}
                    >
                        <Plus size={16}/>
                        Invite Employee
                    </Button>
                </div>
                <Input
                    placeholder="Search employee"
                    value={search}
                    onChange={(e)=>
                        setSearch(
                            e.target.value
                        )
                    }
                />
                {
                    filtered.length===0 ?
                    (
                        <div
                            className="
                            text-center
                            text-slate-400
                            py-12
                            "
                        >
                            No Employees Found
                        </div>
                    ):
                    (
                        <EmployeeTable
                            employees={paginated}
                            currentUser={user}
                            onResend={handleResend}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onSalary={(employee)=>{
                                setSelectedEmployee(employee);
                                setSalaryOpen(true);
                            }}
                        />
                    )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={page===1} onClick={() => setPage(page-1)}> Previous </Button>
                    <Button className="text-white" disabled={end>=filtered.length} onClick={() => setPage(page+1)}> Next </Button>
                </div>
                <InviteEmployeeDialog
                    open={open}
                    onOpenChange={setOpen}
                    loading={invite.isPending}
                    onSubmit={handleInvite}
                    departments={departments.data ?? []}
                />
                <SalaryStructureDialog
                    open={salaryOpen}
                    onOpenChange={setSalaryOpen}
                    employee={selectedEmployee}
                    loading={
                        createSalary.isPending
                    }
                    onSubmit={(data) => {
                        console.log(data);
                        createSalary.mutate(
                            data,
                            {
                                onSuccess() {
                                    toast.success("Salary assigned successfully");
                                    setSalaryOpen(false);
                                    setSelectedEmployee(null);
                                },
                                onError() {
                                    toast.error(
                                        "Unable to assign salary"
                                    );
                                }
                            }
                        );
                    }}
                />
            </div>
        </AppLayout>
    );
}

export default EmployeePage;