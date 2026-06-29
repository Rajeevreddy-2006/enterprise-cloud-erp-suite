import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props{
    notifications:any[];
}

function NotificationsWidget({ notifications }:Props){
    return(
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
            <CardTitle className="text-white"> Notifications </CardTitle>
        </CardHeader>
        <CardContent>
        {
            notifications.map((notification)=>(
                <div key={notification.id} className="py-3 border-b border-slate-800">
                    <p className="text-white"> {notification.message} </p>
                    <p className="text-sm text-slate-400"> {notification.createdAt} </p>
                </div>
            ))
        }
        </CardContent>
        </Card>
    )
}

export default NotificationsWidget;