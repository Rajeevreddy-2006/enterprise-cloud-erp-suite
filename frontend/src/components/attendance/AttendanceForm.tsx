import {

    useForm

}

    from "react-hook-form";

import {

    zodResolver

}

    from "@hookform/resolvers/zod";

import {

    attendanceSchema,

    type AttendanceFormData

}

    from "@/schemas/attendance.schema";

import {

    AttendanceStatus

}

    from "@/types/attendance.types";

import {

    Button

}

    from "@/components/ui/button";

import {

    Input

}

    from "@/components/ui/input";

import {

    Select,

    SelectContent,

    SelectItem,

    SelectTrigger,

    SelectValue

}

    from "@/components/ui/select";


interface Props {

    employeeId: string;

    loading?: boolean;

    defaultValues?: AttendanceFormData;

    onSubmit: (

        data: AttendanceFormData

    ) => void;

}


function AttendanceForm({

    employeeId,

    loading,

    defaultValues,

    onSubmit

}: Props) {

    const {

        register,

        handleSubmit,

        setValue

    }

        =

        useForm<AttendanceFormData>({

            resolver:

                zodResolver(

                    attendanceSchema

                ),

            defaultValues: {

                employeeId,

                date:

                    defaultValues?.date ||

                    "",

                status:

                    defaultValues?.status ||

                    AttendanceStatus.PRESENT

            }

        });


    return (

        <form

            onSubmit={

                handleSubmit(

                    onSubmit

                )

            }

            className="space-y-5"

        >


            <div>

                <label

                    className="text-sm

font-medium"

                >

                    Date

                </label>

                <Input

                    type="date"

                    {

                    ...register(

                        "date"

                    )

                    }

                />

            </div>



            <div>

                <label

                    className="text-sm

font-medium"

                >

                    Status

                </label>


                <Select

                    defaultValue={

                        defaultValues?.status ||

                        AttendanceStatus.PRESENT

                    }

                    onValueChange={(value) =>

                        setValue(

                            "status",

                            value as AttendanceStatus

                        )

                    }

                >


                    <SelectTrigger>

                        <SelectValue />

                    </SelectTrigger>


                    <SelectContent>

                        <SelectItem

                            value="PRESENT"

                        >

                            Present

                        </SelectItem>


                        <SelectItem

                            value="ABSENT"

                        >

                            Absent

                        </SelectItem>


                        <SelectItem

                            value="HALF_DAY"

                        >

                            Half Day

                        </SelectItem>


                        <SelectItem

                            value="LEAVE"

                        >

                            Leave

                        </SelectItem>

                    </SelectContent>


                </Select>

            </div>



            <Button

                className="w-full"

                disabled={loading}

            >

                {

                    loading

                        ?

                        "Saving..."

                        :

                        "Save Attendance"

                }

            </Button>


        </form>

    );

}

export default AttendanceForm;