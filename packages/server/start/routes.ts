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

const SelectGamesController = () => import('#controllers/game/select_games');
const CreateGameController = () => import('#controllers/game/create_game');
const DeleteGameController = () => import('#controllers/game/delete_game');

router.group(() => {
  router.get('/', [SelectGamesController, 'getUserGames']).use(middleware.auth());
  router.post('/create', [CreateGameController, 'createGame']).use(middleware.auth());
  router.delete('/delete/:id', [DeleteGameController, 'deleteGame']).use(middleware.auth());
}).prefix('api/games');
