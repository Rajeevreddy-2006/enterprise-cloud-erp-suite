interface Props{

    employeeId:string;

}

function EmployeeActivity({

    employeeId

}:Props){

    return(

        <div className="rounded-lg border p-6 text-white">

            Activity Timeline

        </div>

    );

}

export default EmployeeActivity;