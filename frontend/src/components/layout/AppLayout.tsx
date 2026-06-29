import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
interface Props{
    children: ReactNode;
}

function AppLayout({ children }:Props){
  return(
    <div className="flex bg-slate-950">
        <Sidebar/>
        <div className="flex-1"> 
            <Topbar/>
            <main className="p-6"> {children} </main>
        </div>
    </div>
  )
}

export default AppLayout;