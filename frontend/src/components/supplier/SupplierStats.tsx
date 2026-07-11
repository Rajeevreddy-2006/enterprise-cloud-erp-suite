import { Card, CardContent } from "@/components/ui/card";
import type { Supplier } from "@/types/supplier.types";

interface Props{
    suppliers:Supplier[];
}

function SupplierStats({ suppliers }:Props){
    const total = suppliers.length;
    const active = suppliers.filter(s=>s.isActive).length;
    const inactive = suppliers.filter(s=>!s.isActive).length;
    return(
        <div className="grid md:grid-cols-3 gap-4">
        <Card>
            <CardContent>
            <p>Total</p>
            <h2> {total} </h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <p>Active</p>
            <h2> {active} </h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <p>Inactive</p>
            <h2> {inactive} </h2>
            </CardContent>
        </Card>
        </div>
    );
}

export default SupplierStats;