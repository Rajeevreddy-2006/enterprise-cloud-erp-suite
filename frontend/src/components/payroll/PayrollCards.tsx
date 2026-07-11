import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

interface Props {
    latest?: any;
}

function PayrollCards({

    latest

}: Props) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <Card>

                <CardHeader className="pb-2">

                    <CardTitle className="text-sm text-muted-foreground">

                        Gross Salary

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <h2 className="text-2xl font-bold">

                        ₹{

                            Number(

                                latest?.grossSalary ?? 0

                            ).toLocaleString()

                        }

                    </h2>

                </CardContent>

            </Card>

            <Card>

                <CardHeader className="pb-2">

                    <CardTitle className="text-sm text-muted-foreground">

                        Deductions

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <h2 className="text-2xl font-bold text-red-500">

                        ₹{

                            Number(

                                latest?.deductions ?? 0

                            ).toLocaleString()

                        }

                    </h2>

                </CardContent>

            </Card>

            <Card>

                <CardHeader className="pb-2">

                    <CardTitle className="text-sm text-muted-foreground">

                        Net Salary

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <h2 className="text-2xl font-bold text-green-500">

                        ₹{

                            Number(

                                latest?.netSalary ?? 0

                            ).toLocaleString()

                        }

                    </h2>

                </CardContent>

            </Card>

            <Card>

                <CardHeader className="pb-2">

                    <CardTitle className="text-sm text-muted-foreground">

                        Status

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <span

                        className={

                            latest?.status === "PAID"

                                ?

                                "text-green-500 font-semibold"

                                :

                                latest?.status === "PENDING"

                                    ?

                                    "text-yellow-500 font-semibold"

                                    :

                                    "text-blue-500 font-semibold"

                        }

                    >

                        {

                            latest?.status ??

                            "—"

                        }

                    </span>

                </CardContent>

            </Card>

        </div>

    );

}

export default PayrollCards;