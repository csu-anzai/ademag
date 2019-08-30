import Index from "./views/Index.jsx";
import Tables from "./views/examples/Tables.jsx";
import Icons from "./views/examples/Icons.jsx";
import NotMatch from "./views/NotMatch.jsx";

var routes = [
  {
    path: "/undefault",
    name: "Undefault",
    description:"",
    component: NotMatch,
  },
  {
    path: "/index",
    name: "Home",
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