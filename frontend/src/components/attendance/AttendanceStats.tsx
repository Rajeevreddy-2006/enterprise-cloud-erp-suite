import StatCard from "../dashboard/StatCard";

interface Props{ attendance:any[]; }

function AttendanceStats({ attendance }:Props){
    const present = attendance.filter(a => a.status==="PRESENT").length;
    const absent = attendance.filter(a => a.status==="ABSENT").length;
    const leave = attendance.filter(a => a.status==="LEAVE").length;
    const halfDay = attendance.filter(a => a.status==="HALF_DAY").length;
    return(
        <div className="grid grid-cols-4 gap-4">
            <StatCard title="Present" value={present.toString()}/> 
            <StatCard title="Absent" value={absent.toString()}/>
            <StatCard title="Half Day" value={halfDay.toString()}/>
            <StatCard title="Leave" value={leave.toString()}/>
        </div>
    );
}

export default AttendanceStats;