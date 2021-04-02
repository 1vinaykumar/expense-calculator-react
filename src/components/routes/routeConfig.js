import Login from "../pages/Login";
import NormalHome from "../pages/NormalHome";
import Register from "../pages/Register";
import UserHome from "../pages/UserHome";
import AddSource from "../pages/UserHome/UserDashboard/AddSource";
import EditSource from "../pages/UserHome/UserDashboard/EditSource";
import SourceDetails from "../pages/UserHome/UserDashboard/SourceDetails";

export const routeConfig = [
  {
    id: "normalHome",
    path: "/",
    component: NormalHome,
    isExact: true,
    isPrivate: false,
  },
  {
    id: "login",
    path: "/login",
    component: Login,
    isExact: true,
    isPrivate: false,
  },
  {
    id: "register",
    path: "/register",
    component: Register,
    isExact: true,
    isPrivate: false,
  },
  {
    id: "userHome",
    path: "/user",
    component: UserHome,
    isExact: true,
    isPrivate: true,
  },
  {
    id: "addSource",
    path: "/user/sources/add",
    component: AddSource,
    isExact: true,
    isPrivate: true,
  },
  {
    id: "editSource",
    path: "/user/sources/edit/:sourceId",
    component: EditSource,
    isExact: true,
    isPrivate: true,
  },
  {
    id: "showSources",
    path: "/user/sources/:sourceType",
    component: SourceDetails,
    isExact: true,
    isPrivate: true,
  },
];
