import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props{
    children: ReactNode;
}

function AppLayout({children}:Props){
    return(
        <div className="h-screen flex overflow-hidden bg-slate-950">
            <Sidebar/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar/>
                <main className="flex-1 overflow-y-auto p-6">
                  {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;