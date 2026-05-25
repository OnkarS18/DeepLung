import Home from "../pages/home/page";
import Dashboard from "../pages/dashboard/page";
import Auth from "../pages/auth/page";
import About from "../pages/about/page";
import Features from "../pages/features/page";
import Architecture from "../pages/architecture/page";
import Team from "../pages/team/page";
import Contact from "../pages/contact/page";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/architecture",
    element: <Architecture />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/contact",
    element: <Contact />,
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
