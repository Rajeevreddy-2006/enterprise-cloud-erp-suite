import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierSchema, type SupplierFormData } from "@/schemas/supplier.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    onSubmit: (data: SupplierFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<SupplierFormData>;
}

function SupplierForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const {
        register,
        handleSubmit
    } = useForm<SupplierFormData>({
            resolver:
                zodResolver(
                    supplierSchema
                ) as any,
            defaultValues
        });
    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
            <Input placeholder="Supplier Name" { ...register("name") }/>
            <Input placeholder="Email" { ...register("email") }/>
            <Input placeholder="Phone" { ...register("phone") }/>
            <Input placeholder="Address" { ...register("address") }/>
            <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" }
            </Button>
        </form>
    );
}
export default SupplierForm;