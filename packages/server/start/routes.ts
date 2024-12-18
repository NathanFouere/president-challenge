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
const ChangeTurnController = () => import('../app/game/infrastructure/controllers/change_turn_controller.js');

router.group(() => {
  router.get('/', [GetGamesController, 'getUserGames']).use(middleware.auth());
  router.post('/create', [CreateGameController, 'createGame']).use(middleware.auth());
  router.delete('/delete/:id', [DeleteGameController, 'deleteGame']).use(middleware.auth());
  router.post('/change-turn/:gameId', [ChangeTurnController, 'changeTurn']).use(middleware.auth());
}).prefix('api/games');

/* POLITICAL PARTY */

const GetPoliticalPartiesController = () => import('../app/political-party/infrastructure/controllers/get_political_parties_of_game_controller.js');
const GetPoliticalPartyOfGameController = () => import('#political-party/infrastructure/controllers/get_political_party_of_game_controller');

router.group(() => {
  router.get('/political-parties-of-game/:gameId', [GetPoliticalPartiesController, 'getPoliticalPartiesOfGame']).use(middleware.auth());
  router.get('/:politicalPartyId/game/:gameId', [GetPoliticalPartyOfGameController, 'getPoliticalPartyOfGame']).use(middleware.auth());
}).prefix('api/political-party');

/* EVENTS */

const GetDisplayableEventsOfTurnController = () => import('#event/infrastructure/controllers/get_displayable_events_of_turn_controller');
const GetEventController = () => import('#event/infrastructure/controllers/get_event_controller');
const ChooseChoiceController = () => import('#event/infrastructure/controllers/choose_choice_controller');

router.group(() => {
  router.get('/events-of-turn/:gameId/turn/:turn', [GetDisplayableEventsOfTurnController, 'getDisplayableEventsOfTurn']).use(middleware.auth());
  router.get('/:gameId/:eventId', [GetEventController, 'getEvent']).use(middleware.auth());
  router.post('/choose-choice/:eventId/:choiceId', [ChooseChoiceController, 'chooseChoice']).use(middleware.auth());
}).prefix('api/events');

/* LEGISLATURE */

const GetSenateController = () => import('#legislature/infrastructure/controllers/get_senate_controller');
const GetParliamentController = () => import('#legislature/infrastructure/controllers/get_parliament_controller');

router.group(() => {
  router.get('/senate/:gameId', [GetSenateController, 'getSenate']).use(middleware.auth());
  router.get('/parliament/:gameId', [GetParliamentController, 'getParliament']).use(middleware.auth());
}).prefix('api/legislature');

/* SOCIAL CLASS */

const GetSocialClassesOfGameController = () => import('#social-class/infrastructure/controllers/get_social_classes_of_game_controller');
const GetSocialClassOfGameController = () => import('#social-class/infrastructure/controllers/get_social_class_of_game_controller');

router.group(() => {
  router.get('/:gameId', [GetSocialClassesOfGameController, 'getSocialClassesOfGame']).use(middleware.auth());
  router.get('/:gameId/:socialClassId', [GetSocialClassOfGameController, 'getSocialClassOfGame']).use(middleware.auth());
}).prefix('api/social-class');

/* PRODUCT */

const GetProductsOfGameController = () => import('#product/infrastructure/controller/get_products_of_game_controller');
const GetProductOfGameController = () => import('#product/infrastructure/controller/get_product_of_game_controller');

router.group(() => {
  router.get('/:gameId', [GetProductsOfGameController, 'getProductsOfGame']).use(middleware.auth());
  router.get('/:gameId/:productId', [GetProductOfGameController, 'getProductOfGame']).use(middleware.auth());
}).prefix('api/products');

/* SECTOR */

const GetSectorsOfGameController = () => import('#sector/infrastructure/controller/get_sectors_of_game_controller');
const GetSectorOfGameController = () => import('#sector/infrastructure/controller/get_sector_of_game_controller');

router.group(() => {
  router.get('/:gameId', [GetSectorsOfGameController, 'getSectorsOfGame']).use(middleware.auth());
  router.get('/:gameId/:sectorId', [GetSectorOfGameController, 'getSectorOfGame']).use(middleware.auth());
}).prefix('api/sectors');
