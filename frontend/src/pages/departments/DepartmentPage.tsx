import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import DepartmentTable from "@/components/departments/DepartmentTable";
import DepartmentDialog from "@/components/departments/DepartmentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useDepartments } from "@/hooks/department_hooks/useDepartments";
import { useCreateDepartment } from "@/hooks/department_hooks/useCreateDepartment";
import { useUpdateDepartment } from "@/hooks/department_hooks/useUpdateDepartment";
import { useDeleteDepartment } from "@/hooks/department_hooks/useDeleteDepartment";

function DepartmentPage(){
    const { data, isLoading } = useDepartments();
    const createDepartment = useCreateDepartment();
    const updateDepartment = useUpdateDepartment();
    const deleteDepartment = useDeleteDepartment();
    const [ open, setOpen ] = useState( false );
    const [ selected,setSelected ] = useState<any>(null);
    const [ search, setSearch ] = useState("");
    const departments = data?.data || [];
    const filtered = departments.filter( (d:any) => d.name.toLowerCase().includes(search.toLowerCase()) );
    const handleSubmit=(values:any)=>{
    if( selected ){
        updateDepartment.mutate({ id:selected.id, data:values },{
            onSuccess(){
                toast.success("Department updated");
                setOpen(false);
            }
        });
    }else{
        createDepartment.mutate(values , {
            onSuccess(){
                toast.success("Department created");
                setOpen(false);
            }
        })
    }};
    const handleDelete=(id:string)=>{
        deleteDepartment.mutate(id , {
            onSuccess(){
                toast.success( "Department deleted" );
            }
        })
    };

    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-white"> Departments </h1>
                    <Button onClick={()=>{ setSelected(null); setOpen(true); }} > <Plus size={16}/> New Department </Button>
                </div>
                <Input placeholder="Search Department" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <DepartmentTable 
                        departments={filtered} 
                        onEdit={(department)=>{ setSelected( department ); setOpen(true); }}
                        onDelete={ handleDelete } />
                    <DepartmentDialog
                        open={open}
                        onOpenChange={ setOpen }
                        loading={ createDepartment.isPending || updateDepartment.isPending }
                        defaultValues={ selected }
                        onSubmit={ handleSubmit } />
            </div>
        </AppLayout>
    )}

export default DepartmentPage;