// HomePage.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth_hooks/useAuth";

function HomePage(){

const { isAuthenticated } = useAuth();

return isAuthenticated

?

<Navigate to="/dashboard"/>

:

<Navigate to="/login"/>;

}

export default HomePage;