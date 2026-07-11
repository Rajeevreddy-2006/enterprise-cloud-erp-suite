import { Prisma } from "../generated/prisma/client";
import { getWorkingDays } from "../utils/workingDays";

export function calculatePayroll(
    salaryStructure: any,
    attendances: any[],
    approvedLeaves: any[],
    month: number,
    year: number,
) {
    const basicSalary =
        new Prisma.Decimal(
            salaryStructure.basicSalary
        );
    const hra =
        new Prisma.Decimal(
            salaryStructure.hra
        );
    const bonus =
        new Prisma.Decimal(
            salaryStructure.bonus
        );
    const grossSalary =
        basicSalary
            .plus(hra)
            .plus(bonus);
    const workingDays = getWorkingDays(month,year);
    const absentDays =
        attendances.filter(
            attendance =>
                attendance.status === "ABSENT"
        ).length;
    let unpaidLeaveDays = 0;
    for (const leave of approvedLeaves) {
        if (leave.leaveType !== "UNPAID") {
            continue;
        }
        const days =
            Math.ceil(
                (
                    leave.endDate.getTime()
                    -
                    leave.startDate.getTime()
                )
                /
                (
                    1000*60*60*24
                )
            )
            +
            1;
        unpaidLeaveDays += days;
    }
    const perDaySalary =
        grossSalary.div(workingDays);
    const attendanceDeduction =
        perDaySalary.mul(
            absentDays +
            unpaidLeaveDays
        );
    const pf =
        grossSalary
            .mul(
                salaryStructure.pfPercentage
            )
            .div(100);
    const tax =
        grossSalary
            .mul(
                salaryStructure.taxPercentage
            )
            .div(100);
    const deductions =
        pf
            .plus(tax)
            .plus(attendanceDeduction);
    const netSalary =
        grossSalary.minus(
            deductions
        );
    return {
        grossSalary,
        attendanceDeduction,
        pf,
        tax,
        deductions,
        netSalary,
        absentDays,
        unpaidLeaveDays
    };
}