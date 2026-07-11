import { useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useEmployeeDocuments }
from "@/hooks/document_hooks/useEmployeeDocuments";

import { useUploadDocument }
from "@/hooks/document_hooks/useUploadDocument";

import { useDeleteDocument }
from "@/hooks/document_hooks/useDeleteDocument";

import DocumentsTable
from "../documents/DocumentsTable";

import UploadDocumentDialog
from "../documents/UploadDocumentDialog";

interface Props {
    employeeId: string;
}

function EmployeeDocuments({

    employeeId

}: Props) {

    const [

        open,

        setOpen

    ] = useState(false);

    const {

        data,

        refetch

    } = useEmployeeDocuments(

        employeeId

    );

    const upload =
        useUploadDocument();

    const del =
        useDeleteDocument();

    const docs =
        data?.data || [];

    const handleUpload = async (

        file: File,

        category: string

    ) => {

        try {

            await upload.mutateAsync({

                file,

                category,

                employeeId

            });

            toast.success(

                "Document uploaded"

            );

            setOpen(false);

            refetch();

        }

        catch (error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Upload failed"

            );

        }

    };

    const handleDelete = (

        id: string

    ) => {

        del.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Document deleted"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error?.response?.data?.message ||

                        "Delete failed"

                    );

                }

            }

        );

    };

    return (

        <div className="space-y-6">

            <div className="flex justify-end">

                <Button

                    className="text-white"

                    onClick={() =>

                        setOpen(true)

                    }

                >

                    Upload Document

                </Button>

            </div>

            <DocumentsTable

                documents={docs}

                onDelete={handleDelete}

            />

            <UploadDocumentDialog

                open={open}

                onOpenChange={setOpen}

                loading={

                    upload.isPending

                }

                onSubmit={

                    handleUpload

                }

            />

        </div>

    );

}

export default EmployeeDocuments;