import {
  Bell,
  Settings,
  ChevronDown,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/auth_hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Topbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const unreadCount = 0;

  return (
    <header
      className="
        h-16
        border-b border-slate-800
        bg-slate-900
        flex items-center justify-between
        px-6
      "
    >
      <h1 className="text-lg font-semibold text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">

        {/* Notifications */}

        <button
          onClick={() => navigate("/notifications")}
          className="
            relative
            p-2
            rounded-lg
            hover:bg-slate-800
            transition
          "
        >
          <Bell
            size={20}
            className="text-white"
          />

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -top-1
                -right-1

                w-5
                h-5

                rounded-full

                bg-red-500

                text-white
                text-[11px]

                flex
                items-center
                justify-center
              "
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* Settings */}

        <button
          onClick={() => navigate("/settings")}
          className="
            p-2
            rounded-lg
            hover:bg-slate-800
            transition
          "
        >
          <Settings
            size={20}
            className="text-white"
          />
        </button>

        {/* User Dropdown */}

        <DropdownMenu>

          <DropdownMenuTrigger
            className="
              flex
              items-center
              gap-2

              rounded-lg

              px-3
              py-2

              hover:bg-slate-800

              transition
            "
          >

            <div
              className="
              w-8
              h-8

              rounded-full

              bg-blue-600

              flex

              items-center

              justify-center

              font-semibold

              text-white
              "
              >
              {user?.name?.charAt(0)}
            </div>

            <span
              className="
                text-white
                text-sm
                font-medium
              "
            >

              {/* {user?.name || user?.email} */}

            </span>

            <ChevronDown
              size={16}
              className="text-slate-400"
            />

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-44

              bg-slate-900

              border-slate-700

              text-white
            "
          >

            <DropdownMenuItem
              onClick={()=>
                navigate("/profile")
              }
              className="
                justify-center

                cursor-pointer
              "
            >
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/settings")}
              className="
                justify-center

                cursor-pointer
              "
            >
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/notifications")}
              className="
                justify-center

                cursor-pointer
              "
            >
              Notifications
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                  logout();
                  navigate("/login");
              }}
              className="
                justify-center

                text-red-400

                cursor-pointer
              "
            >
              Logout
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  );
}

export default Topbar;