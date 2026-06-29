import { Card, CardContent, } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
}

function StatCard({title,value,}: Props) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-6">
        <p className="text-slate-400 text-sm">
          {title}
        </p>
        <h2 className="text-3xl font-bold text-white mt-2">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
}

export default StatCard;