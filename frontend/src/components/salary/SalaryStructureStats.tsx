import StatCard from "../dashboard/StatCard";
import type { SalaryStructure } from "@/types/salary.types";

interface Props{
    salaryStructures: SalaryStructure[];
}

function SalaryStructureStats({ salaryStructures }:Props){
    const total = salaryStructures.length;
    const avgBasic = salaryStructures.length?salaryStructures.reduce((a,b) => a + Number(b.basicSalary),0)/salaryStructures.length:0;
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Employees" value={total.toString()}/>
            <StatCard title="Avg Salary" value={`₹${Math.round(avgBasic)}`}/>
            <StatCard title="Structures" value={total.toString()}/>
            <StatCard title="Configured" value={`${total}`}/>
        </div>
    );
}

export default SalaryStructureStats;