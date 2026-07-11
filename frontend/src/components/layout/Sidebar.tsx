import { navigation } from "@/config/navigation";
import { Link, useLocation } from "react-router-dom";

function Sidebar(){
    const location = useLocation();
    return(
        <aside
            className="
            w-64
            h-screen
            overflow-y-auto
            shrink-0
            bg-[#07132B]
            border-r border-[#1E2D4D]
            border-r
            border-slate-800
            p-4
            "
        >
            <div className="pb-4 border-b border-slate-800 text-center">
                <h2
                    className="
                    text-3xl
                    font-extrabold
                    text-white
                    tracking-wide
                    ">
                    AMDOX
                </h2>
                <p
                    className="
                    text-sm
                    text-slate-400
                    font-medium
                    mt-1
                    ">
                    Enterprise ERP
                </p>
            </div>
            {
                navigation.map((item)=>{
                    const active =
                        location.pathname === item.path;
                    return(
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            p-3
                            mb-2
                            transition-all
                            ${
                                active
                                ?
                                "bg-blue-600 text-white"
                                :
                                "text-slate-300 hover:bg-slate-800"
                            }
                            `}
                        >
                            <item.icon size={18}/>
                            <span>
                                {item.title}
                            </span>
                        </Link>
                    );
                })
            }
        </aside>
    );
}

export default Sidebar;