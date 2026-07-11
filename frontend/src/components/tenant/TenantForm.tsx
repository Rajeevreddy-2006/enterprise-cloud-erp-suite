import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    tenantSchema,
    type TenantFormData
} from "@/schemas/tenant.schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    onSubmit: (data: TenantFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<TenantFormData>;
}

function TenantForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TenantFormData>({
        resolver: zodResolver(
            tenantSchema
        ),
        defaultValues: {
            name: "",
            slug: "",
            isActive: true
        }
    });
    useEffect(() => {
        if (defaultValues) {
            reset({
                name:defaultValues.name || "",
                slug:defaultValues.slug || "",
                isActive: defaultValues.isActive ?? true
            });
        }
    }, [defaultValues, reset]);
    return (
        <form onSubmit={handleSubmit((data) => {onSubmit(data);})} className="space-y-4">
            <Input placeholder="Tenant Name" {...register("name")}/>
            {errors.name && (
                <p className="text-red-500 text-sm">
                    {errors.name.message}
                </p>
            )}
            <Input placeholder="Slug" {...register("slug")}/>
            {errors.slug && (
                <p className="text-red-500 text-sm">
                    {errors.slug.message}
                </p>
            )}
            <select {...register("isActive",{ setValueAs: (v) => v === "true" })}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-2">
                <option value="true">
                    Active
                </option>
                <option value="false">
                    Inactive
                </option>
            </select>
            {errors.isActive && (
                <p className="text-red-500 text-sm">
                    {errors.isActive.message}
                </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
                {
                    loading?"Saving...":"Save"
                }
            </Button>
        </form>
    );
}

export default TenantForm;