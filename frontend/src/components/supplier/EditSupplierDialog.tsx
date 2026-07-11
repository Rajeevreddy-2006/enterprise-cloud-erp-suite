import {

    useEffect,

    useState

}

from "react";

import {

    Dialog,

    DialogContent,

    DialogHeader,

    DialogTitle

}

from "@/components/ui/dialog";

import {

    Input

}

from "@/components/ui/input";

import {

    Button

}

from "@/components/ui/button";

import {

    Switch

}

from "@/components/ui/switch";

import {

    Label

}

from "@/components/ui/label";

interface Props {

    open: boolean;

    onOpenChange: (

        value: boolean

    ) => void;

    supplier: any;

    loading?: boolean;

    onSubmit: (

        data: any

    ) => void;

}

function EditSupplierDialog({

    open,

    onOpenChange,

    supplier,

    loading,

    onSubmit

}: Props) {

    const [

        form,

        setForm

    ] = useState({

        name: "",

        email: "",

        phone: "",

        address: "",

        isActive: true

    });

    useEffect(() => {

        if (

            supplier

        ) {

            setForm({

                name:

                    supplier.name || "",

                email:

                    supplier.email || "",

                phone:

                    supplier.phone || "",

                address:

                    supplier.address || "",

                isActive:

                    supplier.isActive

            });

        }

    }, [

        supplier

    ]);

    const handleSubmit = () => {

        onSubmit(

            form

        );

    };

    return (

        <Dialog

            open={open}

            onOpenChange={

                onOpenChange

            }

        >

            <DialogContent

                className="sm:max-w-lg"

            >

                <DialogHeader>

                    <DialogTitle>

                        Edit Supplier

                    </DialogTitle>

                </DialogHeader>

                <div

                    className="space-y-4"

                >

                    <Input

                        placeholder="Supplier Name"

                        value={

                            form.name

                        }

                        onChange={(e) =>

                            setForm({

                                ...form,

                                name:

                                    e.target.value

                            })

                        }

                    />

                    <Input

                        type="email"

                        placeholder="Email"

                        value={

                            form.email

                        }

                        onChange={(e) =>

                            setForm({

                                ...form,

                                email:

                                    e.target.value

                            })

                        }

                    />

                    <Input

                        placeholder="Phone Number"

                        value={

                            form.phone

                        }

                        onChange={(e) =>

                            setForm({

                                ...form,

                                phone:

                                    e.target.value

                            })

                        }

                    />

                    <Input

                        placeholder="Address"

                        value={

                            form.address

                        }

                        onChange={(e) =>

                            setForm({

                                ...form,

                                address:

                                    e.target.value

                            })

                        }

                    />

                    <div

                        className="flex items-center justify-between rounded-md border p-3"

                    >

                        <Label>

                            Active Supplier

                        </Label>

                        <Switch

                            checked={

                                form.isActive

                            }

                            onCheckedChange={(checked) =>

                                setForm({

                                    ...form,

                                    isActive:

                                        checked

                                })

                            }

                        />

                    </div>

                    <Button

                        className="w-full text-white"

                        disabled={

                            loading

                        }

                        onClick={

                            handleSubmit

                        }

                    >

                        {

                            loading

                                ?

                                "Updating..."

                                :

                                "Update Supplier"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditSupplierDialog;