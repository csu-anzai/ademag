import Index from "./views/Index.jsx";
import Tables from "./views/examples/Tables.jsx";
import Icons from "./views/examples/Icons.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    description:"",
    component: Index,
  },
  {
    path: "/icons",
    name: "Icons",
    description:"",
    component: Icons,
  },
  {
    path: "/tables",
    name: "Tables",
    description:"",
    component: Tables,
  }
];
export default routes;