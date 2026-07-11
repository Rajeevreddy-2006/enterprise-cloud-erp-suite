import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export interface EditProfileForm {
    name: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultValues: EditProfileForm;
    onSubmit: (values: EditProfileForm) => void;
}

function EditProfileDialog({
    open,
    onOpenChange,
    defaultValues,
    onSubmit
}: Props) {
    const { register, handleSubmit } = useForm<EditProfileForm>({ defaultValues });
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white">
                <DialogHeader>
                    <DialogTitle> Edit Profile </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input placeholder="Name" {...register("name")} />
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}> Cancel </Button>
                        <Button type="submit"> Save Changes </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditProfileDialog;