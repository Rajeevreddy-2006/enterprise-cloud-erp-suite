import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    onSubmit: (
        file: File,
        category: string
    ) => void;

    loading?: boolean;

}

function UploadDocumentDialog({

    open,

    onOpenChange,

    onSubmit,

    loading

}: Props) {

    const [

        file,

        setFile

    ] = useState<File>();

    const [

        category,

        setCategory

    ] = useState(

        "EMPLOYEE"

    );

    const handleUpload = () => {

        if (!file) return;

        onSubmit(

            file,

            category

        );

    };

    return (

        <Dialog

            open={open}

            onOpenChange={(value) => {

                onOpenChange(

                    value

                );

                if (!value) {

                    setFile(

                        undefined

                    );

                    setCategory(

                        "EMPLOYEE"

                    );

                }

            }}

        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        Upload Document

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    <Input

                        type="file"

                        onChange={(e) =>

                            setFile(

                                e.target.files?.[0]

                            )

                        }

                    />

                    <Select

                        value={category}

                        onValueChange={setCategory}

                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="EMPLOYEE">

                                Employee

                            </SelectItem>

                            <SelectItem value="PAYSLIP">

                                Payslip

                            </SelectItem>

                            <SelectItem value="CONTRACT">

                                Contract

                            </SelectItem>

                            <SelectItem value="AADHAR">

                                Aadhaar

                            </SelectItem>

                            <SelectItem value="PAN">

                                PAN Card

                            </SelectItem>

                            <SelectItem value="PASSPORT">

                                Passport

                            </SelectItem>

                            <SelectItem value="RESUME">

                                Resume

                            </SelectItem>

                            <SelectItem value="CERTIFICATE">

                                Certificate

                            </SelectItem>

                            <SelectItem value="INVOICE">

                                Invoice

                            </SelectItem>

                            <SelectItem value="PURCHASE_ORDER">

                                Purchase Order

                            </SelectItem>

                            <SelectItem value="EXPENSE">

                                Expense

                            </SelectItem>

                            <SelectItem value="ASSET">

                                Asset

                            </SelectItem>

                            <SelectItem value="SUPPLIER">

                                Supplier

                            </SelectItem>

                            <SelectItem value="OTHER">

                                Other

                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <Button

                        className="w-full"

                        disabled={

                            !file ||

                            loading

                        }

                        onClick={

                            handleUpload

                        }

                    >

                        {

                            loading

                                ?

                                "Uploading..."

                                :

                                "Upload"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default UploadDocumentDialog;