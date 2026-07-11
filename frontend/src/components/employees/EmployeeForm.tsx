import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    employeeSchema,
    type EmployeeFormData
} from "@/schemas/employee.schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { useDepartments } from "@/hooks/department_hooks/useDepartments";

import type { Employee } from "@/types/employee.types";


interface Props {

    onSubmit:(
        data:EmployeeFormData
    )=>void;

    loading?:boolean;

    defaultValues?:Employee | null;

}


function EmployeeForm({

    onSubmit,

    loading,

    defaultValues

}:Props){

    const {

        register,

        handleSubmit,

        setValue,

        reset,

        formState:{ errors }

    }

    =

    useForm<EmployeeFormData>({

        resolver:

        zodResolver(

            employeeSchema

        )

    });


    useEffect(()=>{

        if(defaultValues){

            reset({

                firstName:

                defaultValues.firstName,

                lastName:

                defaultValues.lastName,

                email:

                defaultValues.email,

                departmentId:

                defaultValues.departmentId

            });

        }

    },

    [

        defaultValues,

        reset

    ]);


    const {

        data

    }

    =

    useDepartments();


    const departments =

    data?.data || [];


    return(

        <form

            onSubmit={

                handleSubmit(

                    onSubmit

                )

            }

            className="space-y-4"

        >


            <Input

                placeholder="First Name"

                {

                ...register(

                    "firstName"

                )

                }

            />

            {

                errors.firstName &&

                (

                    <p

                    className="text-red-500 text-xs"

                    >

                        {

                        errors.firstName.message

                        }

                    </p>

                )

            }



            <Input

                placeholder="Last Name"

                {

                ...register(

                    "lastName"

                )

                }

            />


            <Input

                placeholder="Email"

                type="email"

                {

                ...register(

                    "email"

                )

                }

            />


            <Select

                defaultValue={

                    defaultValues?.departmentId

                }

                onValueChange={(value)=>

                    setValue(

                        "departmentId",

                        value

                    )

                }

            >

                <SelectTrigger>

                    <SelectValue

                    placeholder="Department"

                    />

                </SelectTrigger>


                <SelectContent>

                    {

                        departments.map(

                            (

                                dept:any

                            )=>(

                                <SelectItem

                                    key={dept.id}

                                    value={dept.id}

                                >

                                    {

                                        dept.name

                                    }

                                </SelectItem>

                            )

                        )

                    }

                </SelectContent>

            </Select>


            <Button

                className="w-full"

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Saving..."

                    :

                    defaultValues

                    ?

                    "Update Employee"

                    :

                    "Invite Employee"

                }

            </Button>


        </form>

    );

}

export default EmployeeForm;