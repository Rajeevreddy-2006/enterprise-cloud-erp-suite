import StatCard from "../dashboard/StatCard";
import type { Payroll } from "@/types/payroll.types";

interface Props{
    payrolls:Payroll[];
}

function PayrollStats({ payrolls }:Props){
    const pending = payrolls.filter(p => p.status==="PENDING").length;
    const processed = payrolls.filter(p => p.status==="PROCESSED").length;
    const paid = payrolls.filter(p => p.status==="PAID").length;
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            <StatCard title="Pending" value={pending.toString()}/>
            <StatCard title="Processed" value={processed.toString()}/>
            <StatCard title="Paid" value={paid.toString()}/>
            <StatCard title="Total" value={payrolls.length.toString()}/>
        </div>
    );
}

export default PayrollStats;