import Index from "./views/Index";
import Tables from "./views/pagesAdmin/Tables.jsx";
import Icons from "./views/pagesAdmin/Icons.jsx";
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