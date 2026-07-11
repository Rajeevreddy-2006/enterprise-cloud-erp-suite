import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
    Badge
} from "@/components/ui/badge";
import {
    Mail,
    Building2,
    User,
    Calendar
} from "lucide-react";
import {
    useEmployeeProfile
} from "@/hooks/employee_hooks/useEmployeeProfile";

interface Props {
    employeeId: string;
}


function EmployeeOverview({
    employeeId
}: Props) {

    const {
        data,
        isLoading
    } = useEmployeeProfile(employeeId);
    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    const profile = data?.data;
    const employee = profile?.employee;
    const attendance = profile?.attendance;
    const leaves = profile?.leaves;
    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="p-6">
                    <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                            {
                                employee?.firstName?.charAt(0)
                            }
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">
                                {
                                    employee?.firstName
                                }
                                {
                                    employee?.lastName
                                }
                            </h2>
                            <p className="text-slate-400">
                                {
                                    employee?.user?.designation ||
                                    "Employee"
                                }
                            </p>

                            <div
                                className="flex gap-4 mt-3 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Mail size={16}/>
                                    {
                                        employee?.user?.email
                                    }
                                </div>
                                <div className="flexitems-center gap-2">
                                    <Building2 size={16}/>
                                    {
                                        employee?.department?.name
                                    }
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={16}/>
                                    {
                                        employee?.user?.role
                                    }
                                </div>
                            </div>
                            <Badge className="mt-3">
                                {
                                    employee?.user?.isVerified?
                                    "Active":"Pending"
                                }
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div>
                <h3 className="font-semibold text-xl mb-4 text-white">
                    Attendance Summary
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-slate-400">
                                Present
                            </p>
                            <h2 className="text-3xl font-bold">
                                {
                                    attendance?.present
                                }
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-slate-400">
                                Absent
                            </p>
                            <h2 className="text-3xl font-bold">
                                {
                                    attendance?.absent
                                }
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-slate-400">
                                Leave
                            </p>
                            <h2 className="text-3xl font-bold">
                                {
                                    attendance?.leave
                                }
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-slate-400">
                                Paid Days
                            </p>
                            <h2 className="text-3xl font-bold">
                                {
                                    attendance?.paidDays
                                }
                            </h2>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-xl mb-4n text-white">
                    Leave Balance
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-5">
                            Casual
                            <h2 className="text-3xl font-bold">
                                {
                                    leaves?.casual
                                }
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            Sick
                            <h2 className="text-3xl font-bold">
                                {
                                    leaves?.sick
                                }
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            Earned
                            <h2 className="text-3xl font-bold">
                                {
                                    leaves?.earned
                                }
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            Unpaid
                            <h2 className="text-3xl font-bold">
                                {
                                    leaves?.unpaid
                                }
                            </h2>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                        Recent Activity
                    </h3>
                    <p className="text-slate-400">
                        No recent activity
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default EmployeeOverview;