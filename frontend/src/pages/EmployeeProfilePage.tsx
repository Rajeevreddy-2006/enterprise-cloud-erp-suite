import { useParams } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import EmployeeOverview from "@/components/employees/EmployeeOverview";
import EmployeeAttendance from "@/components/employees/EmployeeAttendance";
import EmployeeLeaves from "@/components/employees/EmployeeLeaves";
import EmployeePayroll from "@/components/employees/EmployeePayroll";
import EmployeeDocuments from "@/components/employees/EmployeeDocuments";
import EmployeeAssets from "@/components/employees/EmployeeAssets";
import EmployeeActivity from "@/components/employees/EmployeeActivity";

function EmployeeProfilePage() {

    const { id } = useParams();

    return (
        <AppLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Employee Profile
                    </h1>
                    <p className="text-slate-400">
                        Employee Workspace
                    </p>
                </div>
                <Tabs
                    defaultValue="overview"
                    className="flex gap-8"
                >
                    {/* LEFT SIDEBAR */}
                    <TabsList className="w-56 h-fit flex flex-col items-stretch gap-2 bg-slate-900 rounded-xl p-3 border border-slate-800">
                        <TabsTrigger value="overview" className="text-white">
                            Overview
                        </TabsTrigger>

                        <TabsTrigger value="attendance" className="text-white">
                            Attendance
                        </TabsTrigger>

                        <TabsTrigger value="leave" className="text-white">
                            Leaves
                        </TabsTrigger>

                        <TabsTrigger value="payroll" className="text-white">
                            Payroll
                        </TabsTrigger>

                        <TabsTrigger value="documents" className="text-white">
                            Documents
                        </TabsTrigger>

                        <TabsTrigger value="assets" className="text-white">
                            Assets
                        </TabsTrigger>

                        <TabsTrigger value="activity" className="text-white">
                            Activity
                        </TabsTrigger>
                    </TabsList>
                    {/* CONTENT */}
                    <div className="flex-1">
                        <TabsContent value="overview">
                            <EmployeeOverview
                                employeeId={id!}
                            />
                        </TabsContent>
                        <TabsContent value="attendance">
                            <EmployeeAttendance
                                employeeId={id!}
                            />
                        </TabsContent>
                        <TabsContent
                            value="leave"
                        >
                            <EmployeeLeaves
                                employeeId={id!}
                            />
                        </TabsContent>
                        <TabsContent
                            value="payroll"
                        >
                            <EmployeePayroll
                                employeeId={id!}
                            />
                        </TabsContent>
                        <TabsContent
                            value="documents"
                        >
                            <EmployeeDocuments
                                employeeId={id!}
                            />
                        </TabsContent>
                        <TabsContent
                            value="assets"
                        >
                            <EmployeeAssets
                                employeeId={id!}
                            />
                        </TabsContent>
                        <TabsContent
                            value="activity"
                        >
                            <EmployeeActivity
                                employeeId={id!}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </AppLayout>
    );
}

export default EmployeeProfilePage;