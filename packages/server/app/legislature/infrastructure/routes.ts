import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

/* LEGISLATURE */

const GetSenateController = () => import('#legislature/infrastructure/controllers/get_senate_controller');
const GetParliamentController = () => import('#legislature/infrastructure/controllers/get_parliament_controller');
const GetLawCategoriesController = () => import('#law/infrastructure/controllers/get_law_categories_controller');
const GetLawController = () => import('#law/infrastructure/controllers/get_law_controller');
const VoteLawController = () => import('#law/infrastructure/controllers/vote_law_controller');

router.group(() => {
  router.get('/senate/:gameId', [GetSenateController, 'getSenate']).use(middleware.auth());
  router.get('/parliament/:gameId', [GetParliamentController, 'getParliament']).use(middleware.auth());
  router.get('/law-categories/:gameId', [GetLawCategoriesController, 'getLawCategories']).use(middleware.auth());
  router.get('/law/:gameId/:lawId', [GetLawController, 'getLaw']).use(middleware.auth());
  router.post('/vote-law/:gameId/:lawId', [VoteLawController, 'voteLaw']).use(middleware.auth());
}).prefix('api/legislature');
