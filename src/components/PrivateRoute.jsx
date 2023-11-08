import { Navigate } from "react-router-dom";
import { useAuthHooks } from "../customHooks/useAuthHooks";
import Profile from "../pages/Profile";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const { userLoggedIn, loading } = useAuthHooks();
  console.log(userLoggedIn, loading);
  if (loading) {
    return <Spinner />;
  }

  return userLoggedIn ? <Profile /> : <Navigate to="/sign-up" />;
}
