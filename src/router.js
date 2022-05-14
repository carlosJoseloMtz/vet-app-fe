
import { Router } from '@vaadin/router';

let router = null;

const getRouterInstance = (outlet) => {
  if (router && !outlet) {
    return router;
  }

  router = new Router(outlet);

  router.setRoutes([
    { path: '/login', component: 'login-page' },
    { path: '/customers', component: 'customers-page' },
  ]);

  return router;
};


export { getRouterInstance }
