import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthCont";

const PrivateRoute = ({children}) => {
    const {isloggedIn} = useAuth();

    return(
        isloggedIn ? children : <Navigate to="/login" />
    )
}
export default PrivateRoute;