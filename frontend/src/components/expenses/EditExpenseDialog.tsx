import {
    useEffect,
    useState
} from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    Label
} from "@/components/ui/label";

import {
    Textarea
} from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {
    toast
} from "sonner";

import {
    useEmployees
} from "@/hooks/employee_hooks/useEmployees";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    expense: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditExpenseDialog({

    open,

    onOpenChange,

    expense,

    loading,

    onSubmit

}: Props) {

    const {

        data

    } = useEmployees();

    const employees =
        data?.data || [];

    const [

        form,

        setForm

    ] = useState({

        title: "",

        description: "",

        amount: 0,

        expenseDate: "",

        employeeId: "",

        status: "PENDING"

    });

    useEffect(() => {

        if (!expense) return;

        setForm({

            title:

                expense.title,

            description:

                expense.description || "",

            amount:

                Number(
                    expense.amount
                ),

            expenseDate:

                expense.expenseDate
                    ?.split("T")[0] || "",

            employeeId:

                expense.employeeId,

            status:

                expense.status

        });

    }, [

        expense

    ]);

    const handleSubmit = () => {

        if (

            form.title.trim().length < 2

        ) {

            toast.error(

                "Title is required"

            );

            return;

        }

        if (

            form.amount <= 0

        ) {

            toast.error(

                "Amount must be greater than 0"

            );

            return;

        }

        if (

            !form.expenseDate

        ) {

            toast.error(

                "Expense Date is required"

            );

            return;

        }

        if (

            !form.employeeId

        ) {

            toast.error(

                "Select an Employee"

            );

            return;

        }

        onSubmit(form);

    };

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>

                        Edit Expense

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Title

                        </Label>

                        <Input

                            value={form.title}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    title:

                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Description

                        </Label>

                        <Textarea

                            value={form.description}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    description:

                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Amount

                        </Label>

                        <Input

                            type="number"

                            min={0}

                            value={form.amount}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    amount:

                                        Number(

                                            e.target.value

                                        )

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Expense Date

                        </Label>

                        <Input

                            type="date"

                            value={form.expenseDate}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    expenseDate:

                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Employee

                        </Label>

                        <Select

                            value={form.employeeId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    employeeId:

                                        value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    employees.map(

                                        (

                                            employee: any

                                        ) => (

                                            <SelectItem

                                                key={employee.id}

                                                value={employee.id}

                                            >

                                                {

                                                    employee.employeeId

                                                }

                                                {" - "}

                                                {

                                                    employee.firstName

                                                }

                                                {" "}

                                                {

                                                    employee.lastName

                                                }

                                            </SelectItem>

                                        )

                                    )

                                }

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Status

                        </Label>

                        <Select

                            value={form.status}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    status: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="PENDING">

                                    Pending

                                </SelectItem>

                                <SelectItem value="APPROVED">

                                    Approved

                                </SelectItem>

                                <SelectItem value="REJECTED">

                                    Rejected

                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    <Button

                        className="w-full text-white"

                        disabled={loading}

                        onClick={handleSubmit}

                    >

                        {

                            loading

                                ?

                                "Updating..."

                                :

                                "Update Expense"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditExpenseDialog;