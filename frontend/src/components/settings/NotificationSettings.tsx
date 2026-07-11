import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Bell } from "lucide-react";

function NotificationsCard() {

    const [enabled, setEnabled] = useState(true);

    return (

        <Card className="bg-slate-900 border-slate-800 p-6">

    <div className="flex items-center gap-3 mb-6">

        <Bell className="text-blue-400"/>

        <h2 className="text-white font-semibold text-xl">

            Notifications

        </h2>

    </div>

    <div className="flex justify-between items-center">

        <div>

            <p className="text-white font-medium">

                Enable Notifications

            </p>

            <p className="text-slate-400 text-sm">

                Receive updates and alerts from Amdox ERP

            </p>

        </div>

        {/* <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
        /> */}

    </div>

</Card>

    );

}

export default NotificationsCard;