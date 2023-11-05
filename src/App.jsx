import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/profile", element: <Profile></Profile> },
        { path: "/offer", element: <Offers /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "log-in", element: <LogIn /> },
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
