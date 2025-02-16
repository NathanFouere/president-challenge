import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const GetSectorsOfGameController = () => import('#sector/infrastructure/controller/get_sectors_of_game_controller');
const GetSectorOfGameController = () => import('#sector/infrastructure/controller/get_sector_of_game_controller');

router.group(() => {
  router.get('/:gameId', [GetSectorsOfGameController, 'getSectorsOfGame']).use(middleware.auth());
  router.get('/:gameId/:sectorId', [GetSectorOfGameController, 'getSectorOfGame']).use(middleware.auth());
}).prefix('api/sectors');
