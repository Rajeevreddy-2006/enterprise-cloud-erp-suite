import { Card,CardContent } from "@/components/ui/card";
import type { Inventory } from "@/types/inventory.types";

interface Props{
    inventory:Inventory[];
}

function InventoryStats({ inventory }:Props){
    const totalItems = inventory.length;
    const totalQuantity = inventory.reduce((sum,item) => sum + item.quantity,0);
    const totalValue = inventory.reduce((sum,item) => sum + (item.quantity*item.unitPrice),0);
    const lowStock = inventory.filter(item => item.quantity<10).length;
    return(
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                <p>Total Items</p>
                <h2> {totalItems} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <p>Total Quantity</p>
                <h2> {totalQuantity} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <p>Inventory Value</p>
                <h2> ₹{totalValue} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <p>Low Stock</p>
                <h2> {lowStock} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default InventoryStats;