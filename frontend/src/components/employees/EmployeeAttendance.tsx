import {

    useState

}

    from "react";

import {

    Card,

    CardContent

}

    from "@/components/ui/card";

import {

    Button

}

    from "@/components/ui/button";

import {

    Plus

}

    from "lucide-react";

import type {

    Attendance

}

    from "@/types/attendance.types";

import AttendanceTable

    from "@/components/attendance/AttendanceTable";

import AttendanceDialog

    from "@/components/attendance/AttendanceDialog";

import {

    useEmployeeAttendance

}

    from "@/hooks/attendance_hooks/useEmployeeAttendance";

import {

    useEmployeeAttendanceSummary

}

    from "@/hooks/attendance_hooks/useEmployeeAttendanceSummary";

import {
useCreateAttendance
}
from "@/hooks/attendance_hooks/useCreateAttendance";

import type {
AttendanceFormData
}
from "@/schemas/attendance.schema";

interface Props {

    employeeId: string;

}

function EmployeeAttendance({

    employeeId

}: Props) {

    const {

        data,

        isLoading

    }

        =

        useEmployeeAttendance(

            employeeId

        );


    const {

        data: summaryData

    }

        =

        useEmployeeAttendanceSummary(

            employeeId

        );


    const attendance =

        data?.data || [];


    const summary =

        summaryData?.data ||

        {

            present: 0,

            absent: 0,

            leave: 0,

            paidDays: 0

        };


    const [

        open,

        setOpen

    ]

        =

        useState(false);


    const [

        selected,

        setSelected

    ]

        =

        useState<Attendance | null>(

            null

        );

    const createAttendance = useCreateAttendance();
    const handleSubmit = (

        data: AttendanceFormData

    ) => {

        createAttendance.mutate(

            data,

            {

                onSuccess() {

                    setOpen(false);

                },

                onError() {

                    console.log(

                        "Error"

                    );

                }

            }

        );

    };


    if (isLoading) {

        return (

            <div>

                Loading...

            </div>

        );

    }


    return (

        <div

            className="space-y-6"

        >


            <div

                className="grid

grid-cols-2

md:grid-cols-4

gap-4"

            >


                <Card>

                    <CardContent

                        className="p-5"

                    >

                        Present

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary.present

                            }

                        </h2>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent

                        className="p-5"

                    >

                        Absent

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary.absent

                            }

                        </h2>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent

                        className="p-5"

                    >

                        Leave

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary.leave

                            }

                        </h2>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent

                        className="p-5"

                    >

                        Paid Days

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary.paidDays

                            }

                        </h2>

                    </CardContent>

                </Card>


            </div>



            <div

                className="flex

justify-end"

            >

                <Button className="text-white"

                    onClick={() => {

                        setOpen(true);

                    }}

                >

                    <Plus

                        size={16}

                    />

                    Mark Attendance

                </Button>

            </div>



            <AttendanceTable

                attendance={attendance}

                onEdit={(item: Attendance) => {

                    setSelected(item);

                    setOpen(true);

                }}

                onDelete={() => { }}

            />


            <AttendanceDialog

                open={open}

                onOpenChange={setOpen}

                employeeId={employeeId}

                loading={

                    createAttendance.isPending

                }

                onSubmit={handleSubmit}

            />


        </div>

    );

}

export default EmployeeAttendance;