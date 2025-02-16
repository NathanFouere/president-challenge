import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const GetSocialClassesOfGameController = () => import('#social-class/infrastructure/controllers/get_social_classes_of_game_controller');
const GetSocialClassOfGameController = () => import('#social-class/infrastructure/controllers/get_social_class_of_game_controller');

router.group(() => {
  router.get('/:gameId', [GetSocialClassesOfGameController, 'getSocialClassesOfGame']).use(middleware.auth());
  router.get('/:gameId/:socialClassId', [GetSocialClassOfGameController, 'getSocialClassOfGame']).use(middleware.auth());
}).prefix('api/social-class');
