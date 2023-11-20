import { Navigate } from "react-router-dom";
import { useAuthHooks } from "../customHooks/useAuthHooks";
import Spinner from "./Spinner";
export default function PrivateRoute({ children }) {
  const { userLoggedIn, loading } = useAuthHooks();
  // console.log(userLoggedIn, loading);
  if (loading) {
    return <Spinner />;
  }

  return userLoggedIn ? children : <Navigate to="/sign-up" />;
}
