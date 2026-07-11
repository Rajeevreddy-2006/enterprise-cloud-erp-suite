// import {

//     useForm

// }

//     from "react-hook-form";

// import {

//     Button

// }

//     from "@/components/ui/button";

// import {

//     Input

// }

//     from "@/components/ui/input";

// import {

//     Textarea

// }

//     from "@/components/ui/textarea";

// import {

//     Select,

//     SelectContent,

//     SelectItem,

//     SelectTrigger,

//     SelectValue

// }

//     from "@/components/ui/select";

// import type {

//     LeaveFormData

// }

//     from "@/types/leave.types";

// interface Props {

//     employeeId: string;

//     loading?: boolean;

//     onSubmit: (

//         data: LeaveFormData

//     ) => void;

// }

// function LeaveForm({

//     employeeId,

//     loading,

//     onSubmit

// }: Props) {

//     const {

//         register,

//         handleSubmit,

//         setValue

//     }

//         =

//         useForm<LeaveFormData>({

//             defaultValues: {

//                 employeeId,

//                 leaveType: "CASUAL",

//                 startDate: "",

//                 endDate: "",

//                 reason: ""

//             }

//         });

//     return (

//         <form

//             onSubmit={

//                 handleSubmit(

//                     onSubmit

//                 )

//             }

//             className="space-y-4"

//         >

//             <Select

//                 onValueChange={(v) =>

//                     setValue(

//                         "leaveType",

//                         v as LeaveFormData["leaveType"]

//                     )

//                 }

//             >

//                 <SelectTrigger>

//                     <SelectValue

//                         placeholder="Leave Type"

//                     />

//                 </SelectTrigger>

//                 <SelectContent>

//                     <SelectItem value="CASUAL">

//                         Casual

//                     </SelectItem>

//                     <SelectItem value="SICK">

//                         Sick

//                     </SelectItem>

//                     <SelectItem value="EARNED">

//                         Earned

//                     </SelectItem>

//                     <SelectItem value="UNPAID">

//                         Unpaid

//                     </SelectItem>

//                 </SelectContent>

//             </Select>

//             <Input

//                 type="date"

//                 {

//                 ...register(

//                     "startDate"

//                 )

//                 }

//             />

//             <Input

//                 type="date"

//                 {

//                 ...register(

//                     "endDate"

//                 )

//                 }

//             />

//             <Textarea

//                 placeholder="Reason"

//                 {

//                 ...register(

//                     "reason"

//                 )

//                 }

//             />

//             <Button

//                 className="w-full"

//                 disabled={loading}

//             >

//                 Apply Leave

//             </Button>

//         </form>

//     );

// }

// export default LeaveForm;
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    type LeaveFormData,
    LeaveType,
} from "@/types/leave.types";

interface Props {
    employeeId: string;
    loading?: boolean;
    onSubmit: (data: LeaveFormData) => void;
}

function LeaveForm({
    employeeId,
    loading,
    onSubmit,
}: Props) {

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<LeaveFormData>({
        defaultValues: {
            employeeId,
            leaveType: LeaveType.CASUAL,
            startDate: "",
            endDate: "",
            reason: "",
        },
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <Select
                defaultValue={LeaveType.CASUAL}
                onValueChange={(value) =>
                    setValue(
                        "leaveType",
                        value as LeaveType
                    )
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Leave Type" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value={LeaveType.CASUAL}>
                        Casual
                    </SelectItem>

                    <SelectItem value={LeaveType.SICK}>
                        Sick
                    </SelectItem>

                    <SelectItem value={LeaveType.EARNED}>
                        Earned
                    </SelectItem>

                    <SelectItem value={LeaveType.UNPAID}>
                        Unpaid
                    </SelectItem>
                </SelectContent>
            </Select>

            <Input
                type="date"
                {...register("startDate")}
            />

            <Input
                type="date"
                {...register("endDate")}
            />

            <Textarea
                placeholder="Reason"
                {...register("reason")}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Applying..." : "Apply Leave"}
            </Button>
        </form>
    );
}

export default LeaveForm;