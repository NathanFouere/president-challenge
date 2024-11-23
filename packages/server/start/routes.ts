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

/* AUTHENTICATION */
const LoginController = () => import('#controllers/auth/login_controller');
const LogoutController = () => import('#controllers/auth/logout_controller');
const MeController = () => import('#controllers/auth/me_controller');
const RegisterController = () => import('#controllers/auth/register_controller');

router.group(() => {
  router.post('/signup', [RegisterController, 'signup']);

  router.post('/login', [LoginController, 'login']);

  router.get('/logout', [LogoutController, 'handle']).use(middleware.auth());

  router.get('/me', [MeController, 'me']).use(middleware.auth());
}).prefix('api/auth');

/* GAME */

const GetUserGamesController = () => import('#controllers/game/user_games');

router.group(() => {
  router.get('/:playerId', [GetUserGamesController, 'getUserGames']).use(middleware.auth());
}).prefix('api/games');
