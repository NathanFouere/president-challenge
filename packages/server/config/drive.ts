import { defineConfig, services } from '@adonisjs/drive';
import env from '#start/env';

const driveConfig = defineConfig({
  default: 's3',

  /**
   * The services object can be used to configure multiple file system
   * services each using the same or a different driver.
   */
  services: {
    s3: services.s3({
      forcePathStyle: true,
      endpoint: env.get('MINIO_ENDPOINT'),
      credentials: {
        accessKeyId: env.get('MINIO_ROOT_USER'),
        secretAccessKey: env.get('MINIO_ROOT_PASSWORD'),
      },
      region: env.get('MINIO_REGION'),
      bucket: env.get('MINIO_DEFAULT_BUCKETS'),
      visibility: 'public',
    }),
  },
});

export default driveConfig;

declare module '@adonisjs/drive/types' {
  export interface DriveDisks extends InferDriveDisks<typeof driveConfig> {}
}
