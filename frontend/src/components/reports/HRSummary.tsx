import ReportCard from "./ReportCard";

function HRSummary({
    data
}: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-4"> HR Summary </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ReportCard title="Employees" value={data.totalEmployees}/>
                <ReportCard title="Departments" value={data.totalDepartments}/>
                <ReportCard title="Leaves" value={data.totalLeaves}/>
                <ReportCard title="Attendance" value={data.totalAttendance}/>
            </div>
        </div>
    );
}

export default HRSummary;