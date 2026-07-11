// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//     inviteSchema,
//     type InviteFormData 
// } from "@/schemas/invite.schema";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface Props {
//     open: boolean;
//     onOpenChange: (v: boolean) => void;
//     loading: boolean;
//     onSubmit: (data: InviteFormData) => void;
// }

// function InviteEmployeeDialog({
//     open,
//     onOpenChange,
//     loading,
//     onSubmit
// }: Props) {
//     const {
//         register,
//         handleSubmit
//     } = useForm<InviteFormData>({resolver: zodResolver(inviteSchema)});
//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle> Invite Employee </DialogTitle>
//                 </DialogHeader>
//                 <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//                     <Input placeholder="Name" {...register("name")}/>
//                     <Input placeholder="Email" {...register("email")}/>
//                     <Input placeholder="Designation" {...register("designation")}/>
//                     <select {...register("role")} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white">
//                         <option value="EMPLOYEE">
//                             Employee
//                         </option>
//                         <option value="HR">
//                             HR
//                         </option>
//                         <option value="MANAGER">
//                             Manager
//                         </option>
//                         <option value="FINANCE_MANAGER">
//                             Finance Manager
//                         </option>
//                         <option value="ACCOUNTANT">
//                             Accountant
//                         </option>
//                         <option value="PROCUREMENT_MANAGER">
//                             Procurement Manager
//                         </option>
//                         <option value="INVENTORY_MANAGER">
//                             Inventory Manager
//                         </option>
//                         <option value="SALES_MANAGER">
//                             Sales Manager
//                         </option>
//                         <option value="SALES_EXECUTIVE">
//                             Sales Executive
//                         </option>
//                     </select>
//                     <Button className="w-full" disabled={loading}>
//                         Send Invitation
//                     </Button>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }

// export default InviteEmployeeDialog;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    inviteSchema,
    type InviteFormData,
} from "@/schemas/invite.schema";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { Department } from "@/types/department.types";

interface Props {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    loading: boolean;
    onSubmit: (data: InviteFormData) => void;
    departments: Department[];
}

function InviteEmployeeDialog({
    open,
    onOpenChange,
    loading,
    onSubmit,
    departments,
}: Props) {

    const {
        register,
        handleSubmit,
    } = useForm<InviteFormData>({
        resolver: zodResolver(inviteSchema),
    });

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">

                <DialogHeader>
                    <DialogTitle>
                        Invite Employee
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div className="space-y-2">
                        <Label>Name</Label>

                        <Input
                            {...register("name")}
                            placeholder="Enter employee name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="Enter employee email"
                        />
                    </div>

                    <div className="space-y-2">

                        <Label>Department</Label>

                        <select
                            {...register("departmentId")}
                            className="w-full rounded-md border border-slate-700 bg-slate-900 p-2.5 text-white"
                        >

                            <option value="">
                                Select Department
                            </option>

                            {departments.map((department) => (

                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="space-y-2">

                        <Label>Designation</Label>

                        <Input
                            {...register("designation")}
                            placeholder="e.g. Software Engineer"
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>Role</Label>

                        <select
                            {...register("role")}
                            className="w-full rounded-md border border-slate-700 bg-slate-900 p-2.5 text-white"
                        >

                            <option value="EMPLOYEE">
                                Employee
                            </option>

                            <option value="HR">
                                HR
                            </option>

                            <option value="MANAGER">
                                Manager
                            </option>

                            <option value="FINANCE_MANAGER">
                                Finance Manager
                            </option>

                            <option value="ACCOUNTANT">
                                Accountant
                            </option>

                            <option value="PROCUREMENT_MANAGER">
                                Procurement Manager
                            </option>

                            <option value="INVENTORY_MANAGER">
                                Inventory Manager
                            </option>

                            <option value="SALES_MANAGER">
                                Sales Manager
                            </option>

                            <option value="SALES_EXECUTIVE">
                                Sales Executive
                            </option>

                        </select>

                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Invitation"}
                    </Button>

                </form>

            </DialogContent>

        </Dialog>
    );
}

export default InviteEmployeeDialog;