import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const LoginController = () => import('#user/infrastructure/controllers/login_controller');
const LogoutController = () => import('#user/infrastructure/controllers/logout_controller');
const MeController = () => import('#user/infrastructure/controllers/me_controller');
const RegisterController = () => import('#user/infrastructure/controllers/register_controller');

router.group(() => {
  router.post('/signup', [RegisterController, 'signup']);
  router.post('/login', [LoginController, 'login']);
  router.get('/logout', [LogoutController, 'handle']).use(middleware.auth());
  router.get('/me', [MeController, 'me']).use(middleware.auth());
}).prefix('api/auth');
