import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const GetEventController = () => import('#event/infrastructure/controllers/get_event_controller');
const ChooseChoiceController = () => import('#event/infrastructure/controllers/choose_choice_controller');

router.group(() => {
  router.get('/:gameId/:eventId', [GetEventController, 'getEvent']).use(middleware.auth());
  router.post('/choose-choice/:eventId/:choiceId', [ChooseChoiceController, 'chooseChoice']).use(middleware.auth());
}).prefix('api/events');
