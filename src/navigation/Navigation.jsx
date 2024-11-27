import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Users from "../pages/Users";
import Role from "../pages/Roles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/users",
    element: <Users />,
  },

  {
    path: "/role",
    element: <Role />,
  },
]);

function Navigation() {
  return <RouterProvider router={router} />;
}

export default Navigation;
