import {
    useState
} from "react";

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

import {
    useEmployees
} from "@/hooks/employee_hooks/useEmployees";

interface Props {
    open:boolean;
    onOpenChange:(v:boolean)=>void;
    asset:any;
    loading?:boolean;
    onSubmit:(
        employeeId:string,
        remarks:string
    )=>void;
}

function AssignAssetDialog({
    open,
    onOpenChange,
    asset,
    loading,
    onSubmit
}:Props){
    const { data } = useEmployees();
    const employees= data?.data || [];
    const [ employeeId,setEmployeeId ] = useState("");
    const [ remarks,setRemarks ] = useState("");
    return(
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Assign Asset
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Asset
                        </p>
                        <p className="font-medium">
                            {
                                asset?.name
                            }
                        </p>
                    </div>
                    <Select
                        value={employeeId}
                        onValueChange={
                            setEmployeeId
                        }
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Employee"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                employees.map(
                                    (
                                        employee:any
                                    )=>(
                                        <SelectItem
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {
                                                employee.firstName
                                            }
                                            {" "}
                                            {
                                                employee.lastName
                                            }
                                        </SelectItem>
                                    )
                                )
                            }
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Remarks"
                        value={remarks}
                        onChange={(e)=>
                            setRemarks(
                                e.target.value
                            )
                        }
                    />
                    <Button
                        className="w-full text-white"
                        disabled={
                            !employeeId ||
                            loading
                        }
                        onClick={()=>{
                            onSubmit(
                                employeeId,
                                remarks
                            );
                        }}
                    >
                        {
                            loading
                            ?
                            "Assigning..."
                            :
                            "Assign Asset"
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AssignAssetDialog;