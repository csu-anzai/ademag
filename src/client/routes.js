import Home from "./views/Home/HomeView";
import NotMatch from "./views/NotMatch.jsx";
import DashBoard from './views/DashBoard/DashBoard.jsx'

var routes = [
  {
    path: "/undefault",
    name: "Undefault",
    description:"",
    component: NotMatch,
  },
  {
    path: "/index",
    name: "index",
    description:"",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    description:"",
    component: DashBoard,
  }
];

export default routes;