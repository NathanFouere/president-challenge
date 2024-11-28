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

/* GAME */

const GetGamesController = () => import('#game/infrastructure/controllers/get_games_controller');
const CreateGameController = () => import('../app/game/infrastructure/controllers/create_game_controller.js');
const DeleteGameController = () => import('../app/game/infrastructure/controllers/delete_game_controller.js');

router.group(() => {
  router.get('/', [GetGamesController, 'getUserGames']).use(middleware.auth());
  router.post('/create', [CreateGameController, 'createGame']).use(middleware.auth());
  router.delete('/delete/:id', [DeleteGameController, 'deleteGame']).use(middleware.auth());
}).prefix('api/games');

/* POLITICAL PARTY */

const GetPoliticalPartiesController = () => import('../app/political-party/infrastructure/controllers/get_political_parties_of_game_controller.js');
const GetPoliticalPartyOfGameController = () => import('#political-party/infrastructure/controllers/get_political_party_of_game_controller');

router.group(() => {
  router.get('/political-parties-of-game/:gameId', [GetPoliticalPartiesController, 'getPoliticalPartiesOfGame']).use(middleware.auth());
  router.get('/:politicalPartyId/game/:gameId', [GetPoliticalPartyOfGameController, 'getPoliticalPartyOfGame']).use(middleware.auth());
}).prefix('api/political-party');
