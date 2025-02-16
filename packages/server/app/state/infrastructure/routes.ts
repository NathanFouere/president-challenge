import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

/* STATE */

const GetStateOfGameController = () => import('#state/infrastructure/controller/get_state_of_game_controller');
const GetBudgetController = () => import('#budget/infrastructure/controller/get_budget_controller');

router.group(() => {
  router.get('/:gameId', [GetStateOfGameController, 'getStateOfGame']).use(middleware.auth());
  router.get('/budget/:budgetId', [GetBudgetController, 'getBudgetOfState']).use(middleware.auth());
}).prefix('api/state');
