import { z } from "zod";

export const leaveSchema = z.object({

    employeeId:

        z.string(),

    leaveType:

        z.enum([

            "CASUAL",

            "SICK",

            "EARNED",

            "UNPAID"

        ]),

    startDate:

        z.string(),

    endDate:

        z.string(),

    reason:

        z.string()

            .optional()

});

export type LeaveFormData =
    z.infer<typeof leaveSchema>;