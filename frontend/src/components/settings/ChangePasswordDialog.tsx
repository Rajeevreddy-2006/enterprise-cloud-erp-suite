import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: any) => void;
}

function ChangePasswordDialog({
    open,
    onOpenChange,
    onSubmit
}: Props) {
    const {
        register,
        handleSubmit
    } = useForm();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Change Password </DialogTitle>
                </DialogHeader>
                <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                    <Input type="password" placeholder="Current Password" {...register("currentPassword")}/>
                    <Input type="password" placeholder="New Password" {...register("newPassword")}/>
                    <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")}/>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" type="button" onClick={() => {onOpenChange(false)}}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ChangePasswordDialog;