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

    Badge

}

from "@/components/ui/badge";

import {

    useEmployeeAssets

}

from "@/hooks/asset_hooks/useEmployeeAssets";

interface Props {

    employeeId:string;

}

function EmployeeAssets({

    employeeId

}:Props){

    const {

        data,

        isLoading

    }

    =

    useEmployeeAssets(

        employeeId

    );

    const assets =

        data?.data ||

        [];

    const getStatusVariant=(

        status:string

    )=>{

        switch(status){

            case "AVAILABLE":

                return "default";

            case "ASSIGNED":

                return "secondary";

            case "UNDER_MAINTENANCE":

                return "outline";

            case "RETIRED":

                return "destructive";

            default:

                return "outline";

        }

    };

    return(

        <div

            className="rounded-xl border"

        >

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            Asset

                        </TableHead>

                        <TableHead>

                            Code

                        </TableHead>

                        <TableHead>

                            Category

                        </TableHead>

                        <TableHead>

                            Supplier

                        </TableHead>

                        <TableHead>

                            Value

                        </TableHead>

                        <TableHead>

                            Assigned

                        </TableHead>

                        <TableHead>

                            Status

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        isLoading

                        ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={7}

                                    className="text-center py-10"

                                >

                                    Loading...

                                </TableCell>

                            </TableRow>

                        )

                        :

                        assets.length===0

                        ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={7}

                                    className="text-center py-10"

                                >

                                    No Assets Assigned

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            assets.map(

                                (

                                    item:any

                                )=>(

                                    <TableRow

                                        key={item.id}

                                    >

                                        <TableCell>

                                            {

                                                item.asset.name

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                item.asset.assetCode

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                item.asset.category==="OTHER"

                                                ?

                                                item.asset.customCategory

                                                ||

                                                "Other"

                                                :

                                                item.asset.category

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                item.asset.supplier?.name

                                                ||

                                                "—"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹{

                                                Number(

                                                    item.asset.currentValue

                                                )

                                                .toLocaleString()

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                new Date(

                                                    item.assignedAt

                                                )

                                                .toLocaleDateString()

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getStatusVariant(

                                                        item.asset.status

                                                    )

                                                }

                                            >

                                                {

                                                    item.asset.status

                                                }

                                            </Badge>

                                        </TableCell>

                                    </TableRow>

                                )

                            )

                        )

                    }

                </TableBody>

            </Table>

        </div>

    );

}

export default EmployeeAssets;