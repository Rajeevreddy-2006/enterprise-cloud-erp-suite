import {

    Card,

    CardContent

}

    from "@/components/ui/card";

function LeaveBalanceCards({

    balance

}: any) {

    if (!balance) {

        return null;

    }

    return (

        <div

            className="grid

grid-cols-2

md:grid-cols-4

gap-4"

        >

            <Card>

                <CardContent className="p-6">

                    <p>

                        Casual

                    </p>

                    <h2>

                        {balance.casual}

                    </h2>

                </CardContent>

            </Card>

            <Card>

                <CardContent className="p-6">

                    <p>

                        Sick

                    </p>

                    <h2>

                        {balance.sick}

                    </h2>

                </CardContent>

            </Card>

            <Card>

                <CardContent className="p-6">

                    <p>

                        Earned

                    </p>

                    <h2>

                        {balance.earned}

                    </h2>

                </CardContent>

            </Card>

            <Card>

                <CardContent className="p-6">

                    <p>

                        Unpaid

                    </p>

                    <h2>

                        {balance.unpaid}

                    </h2>

                </CardContent>

            </Card>

        </div>

    );

}

export default LeaveBalanceCards;