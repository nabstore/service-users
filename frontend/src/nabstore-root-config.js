import { registerApplication, start } from "single-spa";
import { login, logout } from "./redux/slicer/userSlicer";
import store from "./redux/store";

registerApplication({
  name: "@nabstore/monolito",
  app: () => import("./nabstore-monolito"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@nabstore/mfe-users",
  app: () => System.import("@nabstore/mfe-users"),
  activeWhen: ["/users"],
  customProps: {
    store,
    loginAction: login,
    logoutAction: logout,
  },
});

registerApplication({
  name: "@nabstore/mfe-products",
  app: () => System.import("@nabstore/mfe-products"),
  activeWhen: ["/products"],
  customProps: {
    store,
  },
});

System.import("@nabstore/styleguide").then(() => {
  start();
});
