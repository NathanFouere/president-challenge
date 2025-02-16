import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const GetProductsOfGameController = () => import('#product/infrastructure/controller/get_products_of_game_controller');
const GetProductOfGameController = () => import('#product/infrastructure/controller/get_product_of_game_controller');

router.group(() => {
  router.get('/:gameId', [GetProductsOfGameController, 'getProductsOfGame']).use(middleware.auth());
  router.get('/:gameId/:productId', [GetProductOfGameController, 'getProductOfGame']).use(middleware.auth());
}).prefix('api/products');
