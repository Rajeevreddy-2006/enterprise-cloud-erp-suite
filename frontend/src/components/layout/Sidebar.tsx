import { navigation } from "@/config/navigation";
import { Link, useLocation } from "react-router-dom";

function Sidebar(){
  const location = useLocation();
  return(
    <div className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-4">
    <h2 className="text-white font-bold text-2xl mb-8"> Amdox ERP </h2>
    {
        navigation.map((item)=>{
            const active =  location.pathname === item.path;
            return(
                <Link key={item.path} to={item.path} 
                className={`flex items-center gap-3 rounded-lg p-3 mb-2 transition-all ${ active?"bg-blue-600 text-white":"text-slate-300 hover:bg-slate-800"}`}>
                    <item.icon size={18}/>
                    <span> {item.title} </span>
                </Link>
            );
        })
    }
    </div>
  );
}

export default Sidebar;