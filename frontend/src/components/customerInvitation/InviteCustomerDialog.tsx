import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    inviteCustomerSchema,
    type InviteCustomerFormData,
} from "@/schemas/customerInvitation.schema";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    loading: boolean;
    onSubmit: (data: InviteCustomerFormData) => void;
}

function InviteCustomerDialog({
    open,
    onOpenChange,
    loading,
    onSubmit,
}: Props) {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<InviteCustomerFormData>({
        resolver: zodResolver(
            inviteCustomerSchema
        ),
    });

    function handleFormSubmit(
        data: InviteCustomerFormData
    ) {
        onSubmit(data);
        reset();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="w-[95vw] max-w-md rounded-lg p-6">
                <DialogHeader>
                    <DialogTitle>
                        Invite Customer
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-4 sm:space-y-5"
                >
                    <div className="space-y-2">
                        <Label>
                            Customer Email
                        </Label>

                        <Input
                            className="h-11"
                            type="email"
                            placeholder="customer@example.com"
                            {...register("email")}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Sending Invitation..."
                                : "Send Invitation"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default InviteCustomerDialog;