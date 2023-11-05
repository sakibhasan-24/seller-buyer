import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";

import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/profile", element: <Profile></Profile> },
        { path: "/offer", element: <Offers /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot-password", element: <ForgetPassword /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
