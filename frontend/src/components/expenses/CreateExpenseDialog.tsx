import {
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

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function CreateExpenseDialog({

    open,

    onOpenChange,

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

        employeeId: ""

    });

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

                        Create Expense

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Title

                        </Label>

                        <Input

                            placeholder="Expense Title"

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

                            placeholder="Description"

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

                                    amount: Number(

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

                                <SelectValue

                                    placeholder="Select Employee"

                                />

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

                    <Button

                        className="w-full text-white"

                        disabled={loading}

                        onClick={handleSubmit}

                    >

                        {

                            loading

                                ?

                                "Creating..."

                                :

                                "Create Expense"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default CreateExpenseDialog;