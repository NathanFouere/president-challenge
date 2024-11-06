/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import {Test} from "@shared/types/test.js";
const SessionController = () => import('#controllers/session_controller');

const test: Test = {
  test: 'test',
};
router.get('/test', async () => {
  return test;
});

router.on('/').render('pages/home');

router.post('/login', [SessionController, 'store']);

router.post('/register', [SessionController, 'register']);
