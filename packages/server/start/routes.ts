/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import type { Test } from '@shared/types/test.js';
import { middleware } from '#start/kernel';

const SessionController = () => import('#controllers/session_controller');

const test: Test = {
  test: 'test',
};
router.get('/api/test', async () => {
  return test;
});

router.post('/register', [SessionController, 'store']);

router.post('/login', [SessionController, 'register']);

router
  .get('dashboard', async ({ auth }) => {
    const user = auth.getUserOrFail();
    user.doSomething();
  })
  .use(middleware.auth());

/*
router.group(() => {
  router.get('/register', [RegisterController, 'show']).as('register.show');
  router.get('/register', [RegisterController, 'store']).as('register.store');
});
*/
