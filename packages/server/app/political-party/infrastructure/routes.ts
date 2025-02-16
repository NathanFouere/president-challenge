import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const GetPoliticalPartiesController = () => import('#political-party/infrastructure/controllers/get_political_parties_of_game_controller');
const GetPoliticalPartyOfGameController = () => import('#political-party/infrastructure/controllers/get_political_party_of_game_controller');

router.group(() => {
  router.get('/political-parties-of-game/:gameId', [GetPoliticalPartiesController, 'getPoliticalPartiesOfGame']).use(middleware.auth());
  router.get('/:politicalPartyId/game/:gameId', [GetPoliticalPartyOfGameController, 'getPoliticalPartyOfGame']).use(middleware.auth());
}).prefix('api/political-party');
