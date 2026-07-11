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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

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

function CreateAccountDialog({
    open,
    onOpenChange,
    loading,
    onSubmit
}: Props) {
    const [
        form,
        setForm
    ] = useState({
        name: "",
        code: "",
        type: "ASSET"
    });
    const handleSubmit = () => {
        onSubmit(form);
        setForm({
            name: "",
            code: "",
            type: "ASSET"
        });
    };
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Create Account
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label>
                            Account Name
                        </Label>
                        <Input
                            placeholder="Enter account name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Account Code
                        </Label>
                        <Input
                            placeholder="e.g. 1001"
                            value={form.code}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    code: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Account Type
                        </Label>
                        <Select
                            value={form.type}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    type: value
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ASSET">
                                    Asset
                                </SelectItem>
                                <SelectItem value="LIABILITY">
                                    Liability
                                </SelectItem>
                                <SelectItem value="EQUITY">
                                    Equity
                                </SelectItem>
                                <SelectItem value="REVENUE">
                                    Revenue
                                </SelectItem>
                                <SelectItem value="EXPENSE">
                                    Expense
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
                                "Creating..."
                                :
                                "Create Account"
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CreateAccountDialog;