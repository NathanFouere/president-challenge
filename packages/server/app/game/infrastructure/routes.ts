import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const GetGamesController = () => import('#game/infrastructure/controllers/get_games_controller');
const GetGameController = () => import('#game/infrastructure/controllers/get_game_controller');
const CreateGameController = () => import('#game/infrastructure/controllers/create_game_controller');
const DeleteGameController = () => import('#game/infrastructure/controllers/delete_game_controller');
const ChangeTurnController = () => import('#game/infrastructure/controllers/change_turn_controller');
const GetTurnInformationsController = () => import('#game/infrastructure/controllers/get_turn_informations_controller');

router.group(() => {
  router.get('/', [GetGamesController, 'getUserGames']).use(middleware.auth());
  router.get('/:id', [GetGameController, 'getUserGame']).use(middleware.auth());
  router.post('/create', [CreateGameController, 'createGame']).use(middleware.auth());
  router.delete('/delete/:id', [DeleteGameController, 'deleteGame']).use(middleware.auth());
  router.post('/change-turn/:gameId', [ChangeTurnController, 'changeTurn']).use(middleware.auth());
  router.get('/turn-informations/:gameId/:turn', [GetTurnInformationsController, 'getTurnInformations']).use(middleware.auth());
}).prefix('api/games');
