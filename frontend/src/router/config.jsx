import Home from "../pages/home/page";
import Dashboard from "../pages/dashboard/page";
import Auth from "../pages/auth/page";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
