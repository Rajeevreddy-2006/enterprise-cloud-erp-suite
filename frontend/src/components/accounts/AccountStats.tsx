import { Card, CardContent } from "@/components/ui/card";
import type { Account } from "@/types/account.types";

interface Props {
    accounts: Account[];
}

function AccountStats({accounts}: Props) {
    const assets =
        accounts.filter(
            a => a.type === "ASSET"
        ).length;
    const liabilities =
        accounts.filter(
            a => a.type === "LIABILITY"
        ).length;
    const revenues =
        accounts.filter(
            a => a.type === "REVENUE"
        ).length;
    const expenses =
        accounts.filter(
            a => a.type === "EXPENSE"
        ).length;
    return (
        <div className="grid md:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <p>Assets</p>
                    <h2>{assets}</h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Liabilities</p>
                    <h2>{liabilities}</h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Revenue</p>
                    <h2>{revenues}</h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Expenses</p>
                    <h2>{expenses}</h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default AccountStats;