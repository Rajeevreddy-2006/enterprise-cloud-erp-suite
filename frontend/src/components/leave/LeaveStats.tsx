import StatCard from "../dashboard/StatCard";
import type { Leave } from "@/types/leave.types";

interface Props{
    leaves:Leave[];
}

function LeaveStats({ leaves }:Props){
    const pending =
        leaves.filter(
            leave => leave.status==="PENDING"
        ).length;

    const approved =
        leaves.filter(
            leave => leave.status==="APPROVED"
        ).length;

    const rejected =
        leaves.filter(
            leave => leave.status==="REJECTED"
        ).length;

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Pending" value={pending.toString()} />
            <StatCard title="Approved" value={approved.toString()} />
            <StatCard title="Rejected" value={rejected.toString()} />
            <StatCard title="Total Requests" value={leaves.length.toString()} />
        </div>
    );
}

export default LeaveStats;