import type { CustomerInvitation } from "@/types/customerInvitation.types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
    RotateCcw,
    Trash2,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

interface Props {

    invitations: CustomerInvitation[];

    onResend: (id: string) => void;

    onDelete: (id: string) => void;

}

function CustomerInvitationTable({

    invitations,

    onResend,

    onDelete,

}: Props) {

    function renderStatus(
        status: string
    ) {

        switch (status) {

            case "PENDING":

                return (
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Clock3 size={16} />
                        Pending
                    </div>
                );

            case "ACCEPTED":

                return (
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 size={16} />
                        Accepted
                    </div>
                );

            default:

                return (
                    <div className="flex items-center gap-2 text-red-400">
                        <XCircle size={16} />
                        Expired
                    </div>
                );

        }

    }

    return (

        <Table className="text-white">

            <TableHeader>

                <TableRow className="border-slate-800">

                    <TableHead className="text-slate-300">
                        Email
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Status
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Sent On
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Expires
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Actions
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {
                    invitations.map(
                        invitation => (

                            <TableRow
                                key={invitation.id}
                            >

                                <TableCell className="font-medium">

                                    {invitation.email}

                                </TableCell>

                                <TableCell>

                                    {renderStatus(invitation.status)}

                                </TableCell>

                                <TableCell>

                                    {
                                        new Date(
                                            invitation.createdAt
                                        ).toLocaleDateString()
                                    }

                                </TableCell>

                                <TableCell>

                                    {
                                        new Date(
                                            invitation.expiresAt
                                        ).toLocaleDateString()
                                    }

                                </TableCell>

                                <TableCell>

                                    <div className="flex gap-2">

                                        {
                                            invitation.status !==
                                            "ACCEPTED" && (

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-blue-400 hover:text-blue-300"
                                                    onClick={() =>
                                                        onResend(
                                                            invitation.id
                                                        )
                                                    }
                                                >
                                                    <RotateCcw
                                                        size={17}
                                                    />
                                                </Button>

                                            )
                                        }

                                        {
                                            invitation.status !==
                                            "ACCEPTED" && (

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-red-400 hover:text-red-300"
                                                    onClick={() =>
                                                        onDelete(
                                                            invitation.id
                                                        )
                                                    }
                                                >
                                                    <Trash2
                                                        size={17}
                                                    />
                                                </Button>

                                            )
                                        }

                                    </div>

                                </TableCell>

                            </TableRow>

                        )
                    )
                }

            </TableBody>

        </Table>

    );

}

export default CustomerInvitationTable;