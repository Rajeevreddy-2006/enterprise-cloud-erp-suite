import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    expenseSchema,
    type ExpenseFormData
} from "@/schemas/expense.schema";
import { ExpenseStatus } from "@/types/expense.types";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
    onSubmit: (data: ExpenseFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<ExpenseFormData>;
}

function ExpenseForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const employees = useEmployees().data?.data || [];
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<ExpenseFormData>({resolver: zodResolver(expenseSchema) as any,defaultValues});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Title" { ...register("title") }/>
            <Textarea placeholder="Description" { ...register("description") }/>
            <Input type="number" step="0.01" placeholder="Amount" { ...register("amount",{valueAsNumber: true}) }/>
            <Input type="date" {...register("expenseDate")}/>
            <Select onValueChange={(value) => { setValue("employeeId",value); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Employee"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        employees.map((employee: any) => (
                                <SelectItem key={employee.id} value={employee.id}>
                                    { employee.firstName }{" "}{ employee.lastName }
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => { setValue("status",value as ExpenseStatus); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PENDING"> PENDING </SelectItem>
                    <SelectItem value="APPROVED"> APPROVED </SelectItem>
                    <SelectItem value="REJECTED"> REJECTED </SelectItem>
                    <SelectItem value="PAID"> PAID </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}>
                { loading?"Saving...":"Save" }
            </Button>
        </form>
    );
}

export default ExpenseForm;