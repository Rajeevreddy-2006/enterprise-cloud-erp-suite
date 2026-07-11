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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    account: any;
    loading?: boolean;
    onSubmit: (data: any) => void;
}

function EditAccountDialog({
    open,
    onOpenChange,
    account,
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
    useEffect(() => {
        if (!account) return;
        setForm({
            name: account.name,
            code: account.code,
            type: account.type
        });
    }, [
        account
    ]);
    const handleSubmit = () => {
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
                        Edit Account
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label>
                            Account Name
                        </Label>
                        <Input
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
                    <div className="space-y-2">
                        <Label>
                            Current Balance
                        </Label>
                        <Input
                            readOnly
                            value={`₹ ${Number(account?.balance ?? 0).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}`}
                        />
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
                                "Update Account"
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditAccountDialog;