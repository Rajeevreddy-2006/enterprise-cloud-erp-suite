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

interface Props {

    open: boolean;

    onOpenChange: (

        value: boolean

    ) => void;

    customer: any;

    loading?: boolean;

    onSubmit: (

        data: any

    ) => void;

}

function EditCustomerDialog({

    open,

    onOpenChange,

    customer,

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

        address: ""

    });

    useEffect(() => {

        if (

            customer

        ) {

            setForm({

                name:

                    customer.name || "",

                email:

                    customer.email || "",

                phone:

                    customer.phone || "",

                address:

                    customer.address || ""

            });

        }

    }, [

        customer

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

                        Edit Customer

                    </DialogTitle>

                </DialogHeader>

                <div

                    className="space-y-4"

                >

                    <Input

                        placeholder="Customer Name"

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

                                "Update Customer"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditCustomerDialog;