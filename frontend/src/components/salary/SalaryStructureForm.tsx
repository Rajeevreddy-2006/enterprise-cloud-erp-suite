import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    salarySchema,
    type SalaryFormData
} from "@/schemas/salary.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";

interface Props {
    employee: any;
    onSubmit: (data: SalaryFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<SalaryFormData>;
}

function SalaryStructureForm({
    employee,
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<SalaryFormData>({
        resolver: zodResolver(
            salarySchema
        ),
        defaultValues
    });
    useEffect(() => {
        if (employee) {
            setValue(
                "employeeId",
                employee.id
            );
        }
    }, [employee]);
    const basic =
        watch(
            "basicSalary"
        ) || 0;
    const hra =
        watch(
            "hra"
        ) || 0;
    const bonus =
        watch(
            "bonus"
        ) || 0;
    const pf =
        watch(
            "pfPercentage"
        ) || 0;
    const tax =
        watch(
            "taxPercentage"
        ) || 0;
    const gross =
        basic +
        hra +
        bonus;
    const pfAmount =
        gross * pf / 100;
    const taxAmount =
        gross * tax / 100;
    const net =
        gross - pfAmount - taxAmount;
    return (
        <form
            onSubmit={
                handleSubmit(
                    onSubmit
                )
            }
            className="space-y-4"
        >
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-4 space-y-2">
                    <p>
                        <span className="font-semibold">
                            Name :
                        </span>{" "}
                        {employee?.user?.name ?? "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">
                            Role :
                        </span>{" "}
                        {employee?.user?.role || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">
                            Designation :
                        </span>{" "}
                        {employee?.user?.designation || "N/A"}
                    </p>
                </CardContent>
            </Card>

            <Input
                type="number"
                placeholder="Basic Salary"
                {
                ...register(
                    "basicSalary",
                    {
                        valueAsNumber: true
                    }
                )
                }
            />
            <Input
                type="number"
                placeholder="HRA"
                {
                ...register(
                    "hra",
                    {
                        valueAsNumber: true
                    }
                )
                }
            />
            <Input
                type="number"
                placeholder="Bonus"
                {
                ...register(
                    "bonus",
                    {
                        valueAsNumber: true
                    }
                )
                }
            />
            <Input
                type="number"
                placeholder="PF %"
                {
                ...register(
                    "pfPercentage",
                    {
                        valueAsNumber: true
                    }
                )
                }
            />
            <Input
                type="number"
                placeholder="Tax %"
                {
                ...register(
                    "taxPercentage",
                    {
                        valueAsNumber: true
                    }
                )
                }
            />
            <Card>
                <CardContent className="p-4">
                    <p>
                        Gross :
                        ₹{gross}
                    </p>
                    <p>
                        PF :
                        ₹{pfAmount}
                    </p>
                    <p>
                        Tax :
                        ₹{taxAmount}
                    </p>
                    <p className="font-bold">
                        Net :
                        ₹{net}
                    </p>
                </CardContent>
            </Card>
            <Button
                className="w-full"
                disabled={loading}
            >
                {
                    loading?"Saving...":"Save"
                }
            </Button>
        </form>
    );
}

export default SalaryStructureForm;