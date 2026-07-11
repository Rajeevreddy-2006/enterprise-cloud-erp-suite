import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { usePayrollSummary } from "@/hooks/payroll_hooks/usePayrollSummary";

interface Props {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    employeeId: string;

    employeeName: string;

    designation?: string;

    loading?: boolean;

    onSubmit: (
        month: number,
        year: number
    ) => void;

}

const months = [

    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }

];

function GeneratePayrollDialog({

    open,

    onOpenChange,

    employeeId,

    employeeName,

    designation,

    loading,

    onSubmit

}: Props) {

    const [

        month,

        setMonth

    ] = useState(

        new Date().getMonth() + 1

    );

    const [

        year,

        setYear

    ] = useState(

        new Date().getFullYear()

    );

    const {

        data: summary

    } = usePayrollSummary(

        employeeId,

        month,

        year

    );

    const grossSalary =
        Number(summary?.grossSalary ?? 0);

    const attendanceDeduction =
        Number(summary?.attendanceDeduction ?? 0);

    const pf =
        Number(summary?.pf ?? 0);

    const tax =
        Number(summary?.tax ?? 0);

    const deductions =
        Number(summary?.deductions ?? 0);

    const netSalary =
        Number(summary?.netSalary ?? 0);

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent
                className="sm:max-w-xl"
            >

                <DialogHeader>

                    <DialogTitle>

                        Generate Payroll

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-6">

                    {/* Employee */}

                    <div className="rounded-lg border p-4">

                        <h3 className="font-semibold text-lg">

                            {employeeName}

                        </h3>

                        <p className="text-sm text-muted-foreground">

                            {designation || "--"}

                        </p>

                    </div>

                    {/* Month */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Month

                        </label>

                        <Select

                            value={String(month)}

                            onValueChange={(value) =>

                                setMonth(

                                    Number(value)

                                )

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    months.map(

                                        month => (

                                            <SelectItem

                                                key={month.value}

                                                value={String(month.value)}

                                            >

                                                {month.label}

                                            </SelectItem>

                                        )

                                    )

                                }

                            </SelectContent>

                        </Select>

                    </div>

                    {/* Year */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Year

                        </label>

                        <Input

                            type="number"

                            value={year}

                            onChange={(e) =>

                                setYear(

                                    Number(

                                        e.target.value

                                    )

                                )

                            }

                        />

                    </div>

                    <Separator />

                    {/* Payroll Summary */}

                    <div className="rounded-lg border p-4 space-y-4">

                        <h3 className="font-semibold text-lg">

                            Payroll Summary

                        </h3>

                        <div className="flex justify-between">

                            <span>

                                Gross Salary

                            </span>

                            <span className="font-semibold">

                                ₹{grossSalary.toLocaleString()}

                            </span>

                        </div>

                        <Separator />

                        <div className="flex justify-between">

                            <span>

                                Attendance Deduction

                            </span>

                            <span className="text-red-500">

                                ₹{attendanceDeduction.toLocaleString()}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>

                                PF Deduction

                            </span>

                            <span className="text-red-500">

                                ₹{pf.toLocaleString()}

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>

                                Tax Deduction

                            </span>

                            <span className="text-red-500">

                                ₹{tax.toLocaleString()}

                            </span>

                        </div>

                        <Separator />

                        <div className="flex justify-between font-semibold">

                            <span>

                                Total Deductions

                            </span>

                            <span className="text-red-500">

                                ₹{deductions.toLocaleString()}

                            </span>

                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">

                            <span>

                                Net Salary

                            </span>

                            <span className="text-green-500">

                                ₹{netSalary.toLocaleString()}

                            </span>

                        </div>

                    </div>

                    <Button

                        className="w-full"

                        disabled={loading}

                        onClick={() =>

                            onSubmit(

                                month,

                                year

                            )

                        }

                    >

                        {

                            loading

                                ?

                                "Generating Payroll..."

                                :

                                "Generate Payroll"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default GeneratePayrollDialog;