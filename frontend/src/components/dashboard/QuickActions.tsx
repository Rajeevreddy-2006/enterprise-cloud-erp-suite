import { Button } from "@/components/ui/button";

function QuickActions(){
    return(
        <div className="flex gap-4 flex-wrap">
            <Button> Add Employee </Button>
            <Button> Apply Leave </Button>
            <Button> Inventory </Button>
            <Button> Reports </Button>
        </div>
    )
}

export default QuickActions;
