import { Router } from '@vaadin/router';
import { getCurrentUser } from './utils/session-service.js';

let router = null;

const getRouterInstance = outlet => {
  if (router && !outlet) {
    return router;
  }

  router = new Router(outlet);

  router.setRoutes([
    {
      path: '/login',
      component: 'login-page',
      action: (ctx, commands) => {
        const user = getCurrentUser();

        if (user) {
          return commands.redirect('/admin/customers');
        }

        return commands.component;
      },
    },
    {
      path: '/admin',
      children: [
        { path: '/customers', component: 'customers-page' },
        {
          path: '/users',
          children: [{ path: '/my-profile', component: 'user-profile-page' }],
        },
      ],
      action: (ctx, commands) => {
        const user = getCurrentUser();

        if (!user) {
          return commands.redirect('/login');
        }

        return commands.component;
      },
    },
  ]);

  return router;
};

export { getRouterInstance };
