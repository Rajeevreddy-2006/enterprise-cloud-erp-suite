import { Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function Topbar(){
  const { user } = useAuth();
  return(
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
      <h1 className="text-white font-semibold"> Dashboard </h1>
      <div className="flex items-center gap-5">
        <Bell size={18} className="text-white" />
        <div>
          <p className="text-white"> {user?.email} </p> 
          <p className="text-xs text-slate-400"> {user?.role} </p>
        </div>
      </div>
    </header>
  )
}

export default Topbar;