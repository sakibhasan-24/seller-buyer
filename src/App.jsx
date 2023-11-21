import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import CreateProducts from "./pages/CreateProducts";
import Edit from "./pages/Edit";
import SingleItem from "./pages/SingleItem";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/create-products",
          element: (
            <PrivateRoute>
              <CreateProducts></CreateProducts>
            </PrivateRoute>
          ),
        },
        {
          path: "/edit/:id",
          element: (
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          ),
        },
        { path: "/category/:categoryName/:id", element: <SingleItem /> },
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
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
