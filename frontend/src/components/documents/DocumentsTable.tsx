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

import documentService from "@/services/document.service";

interface Props {

    documents: any[];

    onDelete: (

        id:string

    ) => void;

}

function DocumentsTable({

    documents,

    onDelete

}:Props){

    return(

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>

                        Name

                    </TableHead>

                    <TableHead>

                        Category

                    </TableHead>

                    <TableHead>

                        File Link

                    </TableHead>

                    <TableHead>

                        Uploaded On

                    </TableHead>

                    <TableHead>

                        Actions

                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {

                    documents.length===0

                    ?

                    (

                        <TableRow>

                            <TableCell

                                colSpan={5}

                                className="text-center py-10"

                            >

                                No Documents Found

                            </TableCell>

                        </TableRow>

                    )

                    :

                    (

                        documents.map(

                            doc=>(

                                <TableRow

                                    key={doc.id}

                                >

                                    <TableCell>

                                        {

                                            doc.name

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            doc.category

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <a

                                            href={

                                                doc.fileUrl

                                            }

                                            target="_blank"

                                            rel="noreferrer"

                                            className="text-blue-400 hover:underline"

                                        >

                                            Open File

                                        </a>

                                    </TableCell>

                                    <TableCell>

                                        {

                                            new Date(

                                                doc.createdAt

                                            )

                                            .toLocaleDateString()

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <div

                                            className="flex gap-2"

                                        >

                                            {/* <Button

                                                size="sm"

                                                onClick={()=>

                                                    documentService

                                                    .downloadDocument(

                                                        doc.id,

                                                        doc.name

                                                    )

                                                }

                                            >

                                                View

                                            </Button> */}

                                            <Button

                                                size="sm"

                                                variant="destructive"

                                                onClick={()=>

                                                    onDelete(

                                                        doc.id

                                                    )

                                                }

                                            >

                                                Delete

                                            </Button>

                                        </div>

                                    </TableCell>

                                </TableRow>

                            )

                        )

                    )

                }

            </TableBody>

        </Table>

    );

}

export default DocumentsTable;