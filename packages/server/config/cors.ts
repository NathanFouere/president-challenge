import { defineConfig } from '@adonisjs/cors';
import env from '#start/env';

const corsConfig = defineConfig({
  enabled: true,
  origin: [env.get('CLIENT_URL')!],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
});

export default corsConfig;
