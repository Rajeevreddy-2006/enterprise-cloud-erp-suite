import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PayrollStats from "@/components/payroll/PayrollStats";
import PayrollTable from "@/components/payroll/PayrollTable";
import PayrollDialog from "@/components/payroll/PayrollDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { usePayrolls } from "@/hooks/payroll_hooks/usePayrolls";
import { useCreatePayroll } from "@/hooks/payroll_hooks/useCreatePayroll";
import { useUpdatePayroll } from "@/hooks/payroll_hooks/useUpdatePayroll";
import { useDeletePayroll } from "@/hooks/payroll_hooks/useDeletePayroll";
import type { Payroll } from "@/types/payroll.types";
import type { PayrollFormData } from "@/schemas/payroll.schema";

function PayrollPage(){
    const { data } = usePayrolls();
    const createPayroll = useCreatePayroll();
    const updatePayroll = useUpdatePayroll();
    const deletePayroll = useDeletePayroll();
    const [open,setOpen] = useState(false);
    const [search,setSearch] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [selected,setSelected] = useState<Payroll | null>(null);
    const payrolls:Payroll[] = data?.data || [];
    const filteredPayrolls = payrolls.filter((payroll) => {
        const employeeName = `${payroll.employee?.firstName || ""} ${payroll.employee?.lastName || ""}`.toLowerCase();
        const nameMatch = employeeName.includes(search.toLowerCase());
        const monthMatch = month?payroll.month===Number(month):true;
        const yearMatch = year?payroll.year===Number(year):true;
        return ( nameMatch && monthMatch && yearMatch );
    });
    const handleSubmit=(values:PayrollFormData) => {
        if(selected){
            updatePayroll.mutate({ id:selected.id,data:values },{
                onSuccess(){
                    toast.success("Payroll updated");
                    setOpen(false);
                }
            });
        }else{
            createPayroll.mutate(values,{
                onSuccess(){
                    toast.success("Payroll created");
                    setOpen(false);
                }
            });
        }
    };
    const handleDelete=(id:string) => { 
        deletePayroll.mutate(id,{
            onSuccess(){
                toast.success("Payroll deleted");
            }
        });
    };
    const handleEdit=(payroll:Payroll) => {
        setSelected(payroll);
        setOpen(true);
    };
    return(
        <AppLayout>
            <div className="space-y-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-white"> Payroll </h1>
                <Button onClick={ () => { setSelected(null); setOpen(true); } }> <Plus size={16}/> Generate Payroll </Button>
            </div>
            <PayrollStats payrolls={payrolls}/>
            <div className="flex gap-4">
                <Input placeholder="Search Employee" value={search} onChange={(e) => setSearch(e.target.value) }/>
                <Input type="number" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value) }/>
                <Input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value) }/>
            </div>
            <PayrollTable payrolls={filteredPayrolls} onEdit={handleEdit} onDelete={handleDelete} />
            <PayrollDialog
                open={open}
                onOpenChange={setOpen}
                defaultValues={selected}
                loading={ createPayroll.isPending || updatePayroll.isPending }
                onSubmit={handleSubmit}
            />
            </div>
        </AppLayout>
    );
}

export default PayrollPage;