import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@nabstore/monolito",
  app: () => import("./nabstore-monolito"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@nabstore/mfe-users",
  app: () =>
    System.import("@nabstore/mfe-users"),
  activeWhen: ["/users"],
});

System.import("@nabstore/styleguide").then(() => {
  start();
});
