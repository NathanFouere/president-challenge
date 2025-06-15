import router from '@adonisjs/core/services/router';

const EventStreamController = () => import('@adonisjs/transmit/controllers/event_stream_controller');
const SubscribeController = () => import('@adonisjs/transmit/controllers/subscribe_controller');
const UnsubscribeController = () => import('@adonisjs/transmit/controllers/unsubscribe_controller');

router.group(() => {
  router.get('/events', [EventStreamController]);
  router.post('/subscribe', [SubscribeController]);
  router.post('/unsubscribe', [UnsubscribeController]);
}).prefix('api/__transmit');
