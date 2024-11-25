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

const LoginController = () => import('#controllers/user/login_controller');
const LogoutController = () => import('#controllers/user/logout_controller');
const MeController = () => import('#controllers/user/me_controller');
const RegisterController = () => import('#controllers/user/register_controller');

router.group(() => {
  router.post('/signup', [RegisterController, 'signup']);
  router.post('/login', [LoginController, 'login']);
  router.get('/logout', [LogoutController, 'handle']).use(middleware.auth());
  router.get('/me', [MeController, 'me']).use(middleware.auth());
}).prefix('api/auth');

/* GAME */

const SelectGamesController = () => import('#controllers/game/select_games_controller');
const CreateGameController = () => import('#controllers/game/create_game_controller');
const DeleteGameController = () => import('#controllers/game/delete_game_controller');

router.group(() => {
  router.get('/', [SelectGamesController, 'getUserGames']).use(middleware.auth());
  router.post('/create', [CreateGameController, 'createGame']).use(middleware.auth());
  router.delete('/delete/:id', [DeleteGameController, 'deleteGame']).use(middleware.auth());
}).prefix('api/games');
