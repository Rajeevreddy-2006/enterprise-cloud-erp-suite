import { Card, CardContent } from "@/components/ui/card";

interface Props {
    title: string;
    value: number | string;
}

function ReportCard({
    title,
    value
}: Props) {
    return (
        <Card>
            <CardContent className="p-5">
                <p className="text-slate-400"> {title} </p>
                <h2 className="text-3xl font-bold text-white"> {value} </h2>
            </CardContent>
        </Card>
    );
}

export default ReportCard;