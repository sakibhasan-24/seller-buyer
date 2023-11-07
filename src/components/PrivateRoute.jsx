import { Navigate } from "react-router-dom";
import { useAuthHooks } from "../customHooks/useAuthHooks";
import Profile from "../pages/Profile";

export default function PrivateRoute() {
  const { userLoggedIn, loading } = useAuthHooks();
  console.log(userLoggedIn, loading);
  if (loading) {
    return <h1>Loading</h1>;
  }

  return userLoggedIn ? <Profile /> : <Navigate to="/sign-up" />;
}
