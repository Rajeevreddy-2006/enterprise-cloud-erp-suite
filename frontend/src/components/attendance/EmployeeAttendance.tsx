import {

    Card,

    CardContent

}

    from "@/components/ui/card";

import {

    useEmployeeAttendanceSummary

}

    from "@/hooks/attendance_hooks/useEmployeeAttendanceSummary";


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

        useEmployeeAttendanceSummary(

            employeeId

        );


    const summary =

        data?.data;


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

lg:grid-cols-5

gap-4"

            >


                <Card>

                    <CardContent

                        className="p-5"

                    >

                        <p

                            className="text-slate-400"

                        >

                            Present

                        </p>

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary?.present

                            }

                        </h2>

                    </CardContent>

                </Card>



                <Card>

                    <CardContent

                        className="p-5"

                    >

                        <p

                            className="text-slate-400"

                        >

                            Absent

                        </p>

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary?.absent

                            }

                        </h2>

                    </CardContent>

                </Card>



                <Card>

                    <CardContent

                        className="p-5"

                    >

                        <p

                            className="text-slate-400"

                        >

                            Leave

                        </p>

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary?.leave

                            }

                        </h2>

                    </CardContent>

                </Card>



                <Card>

                    <CardContent

                        className="p-5"

                    >

                        <p

                            className="text-slate-400"

                        >

                            Half Day

                        </p>

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary?.halfDay

                            }

                        </h2>

                    </CardContent>

                </Card>



                <Card>

                    <CardContent

                        className="p-5"

                    >

                        <p

                            className="text-slate-400"

                        >

                            Paid Days

                        </p>

                        <h2

                            className="text-3xl

font-bold"

                        >

                            {

                                summary?.paidDays

                            }

                        </h2>

                    </CardContent>

                </Card>



            </div>


        </div>

    );

}

export default EmployeeAttendance;