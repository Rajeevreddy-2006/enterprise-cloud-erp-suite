import {

    Table,

    TableBody,

    TableCell,

    TableHead,

    TableHeader,

    TableRow

}

from "@/components/ui/table";

import {

    Button

}

from "@/components/ui/button";

interface Props{

    payrolls:any[];

    onPay:(

        id:string

    )=>void;

}

function PayrollApprovalTable({

    payrolls,

    onPay

}:Props){

    return(

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>

                        Employee

                    </TableHead>

                    <TableHead>

                        Month

                    </TableHead>

                    <TableHead>

                        Year

                    </TableHead>

                    <TableHead>

                        Gross

                    </TableHead>

                    <TableHead>

                        Net

                    </TableHead>

                    <TableHead>

                        Status

                    </TableHead>

                    <TableHead>

                        Actions

                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {

                    payrolls.map(

                        payroll=>(

                            <TableRow

                                key={payroll.id}

                            >

                                <TableCell>

                                    {

                                        payroll.employee

                                        ?

                                        `${payroll.employee.firstName}

                                        ${payroll.employee.lastName}`

                                        :

                                        "--"

                                    }

                                </TableCell>

                                <TableCell>

                                    {

                                        payroll.month

                                    }

                                </TableCell>

                                <TableCell>

                                    {

                                        payroll.year

                                    }

                                </TableCell>

                                <TableCell>

                                    ₹{

                                        payroll.grossSalary

                                    }

                                </TableCell>

                                <TableCell>

                                    ₹{

                                        payroll.netSalary

                                    }

                                </TableCell>

                                <TableCell>

                                    {

                                        payroll.status

                                    }

                                </TableCell>

                                <TableCell>

                                    {

                                        payroll.status

                                        ===

                                        "PENDING"

                                        ?

                                        (

                                            <Button

                                                size="sm"

                                                onClick={()=>

                                                    onPay(

                                                        payroll.id

                                                    )

                                                }

                                            >

                                                Approve

                                            </Button>

                                        )

                                        :

                                        (

                                            <span>

                                                —

                                            </span>

                                        )

                                    }

                                </TableCell>

                            </TableRow>

                        )

                    )

                }

            </TableBody>

        </Table>

    );

}

export default PayrollApprovalTable;