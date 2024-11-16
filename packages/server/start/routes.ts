/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const LoginController = () => import('#controllers/auth/login_controller');
const LogoutController = () => import('#controllers/auth/logout_controller');
const MeController = () => import('#controllers/auth/me_controller');
const RegisterController = () => import('#controllers/auth/register_controller');

router.group(() => {
  router.post('/api/register', [RegisterController, 'register']);

  router.post('/api/login', [LoginController, 'login']);

  router.get('/api/logout', [LogoutController, 'handle']).use(middleware.auth());

  router.get('/api/me', [MeController, 'me']).use(middleware.auth());
});
