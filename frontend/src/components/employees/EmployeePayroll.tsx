import { useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useEmployeePayroll } from "@/hooks/payroll_hooks/useEmployeePayroll";

import { useCreatePayroll } from "@/hooks/payroll_hooks/useCreatePayroll";

import { useEmployee } from "@/hooks/employee_hooks/useEmployee";

import { useDeletePayroll } from "@/hooks/payroll_hooks/useDeletePayroll";

import PayrollCards from "../payroll/PayrollCards";

import PayrollTable from "../payroll/PayrollTable";

import GeneratePayrollDialog from "../payroll/GeneratePayrollDialog";

interface Props {

    employeeId: string;

}

function EmployeePayroll({

    employeeId

}: Props) {

    const {

        data = [],

        refetch

    }

        =

        useEmployeePayroll(

            employeeId

        );

    const deletePayroll = useDeletePayroll();

    const {

        data: employee

    }

        =

        useEmployee(

            employeeId

        );

    const [

        open,

        setOpen

    ]

        =

        useState(

            false

        );

    const createPayroll =

        useCreatePayroll();

    const handleGenerate = (

        month: number,

        year: number

    ) => {

        createPayroll.mutate(

            {

                employeeId,

                month,

                year

            },

            {

                onSuccess() {

                    toast.success(

                        "Payroll Generated"

                    );

                    setOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to generate payroll"

                    );

                }

            }

        );

    };

    /**
     * TODO:
     * Replace with RBAC
     */

    const canGenerate = true;

    const handleDelete = (

        payrollId: string

    ) => {

        deletePayroll.mutate(

            payrollId,

            {

                onSuccess() {

                    toast.success(

                        "Payroll deleted"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error?.response?.data?.message

                        ||

                        "Delete failed"

                    );

                }

            }

        );

    };

    return (

        <div

            className="space-y-6"

        >

            {

                canGenerate && (

                    <div

                        className="flex justify-end"

                    >

                        <Button

                            className="text-white"

                            onClick={() =>

                                setOpen(true)

                            }

                        >

                            Generate Payroll

                        </Button>

                    </div>

                )

            }

            <PayrollCards

                latest={data[0]}

            />

            <PayrollTable

                payrolls={data}

                showDelete

                canDelete

                onDelete={handleDelete}

            />

            {

                employee && (

                    <GeneratePayrollDialog

                        open={open}

                        onOpenChange={setOpen}

                        employeeId={employee.id}

                        employeeName={`${employee.firstName} ${employee.lastName}`}

                        designation={employee.designation}

                        loading={

                            createPayroll.isPending

                        }

                        onSubmit={

                            handleGenerate

                        }

                    />

                )

            }

        </div>

    );

}

export default EmployeePayroll;