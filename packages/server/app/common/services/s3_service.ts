import { inject } from '@adonisjs/core';
import drive from '@adonisjs/drive/services/main';
import FileDoesntExistError from '#common/error/file_doesnt_exist_error';
import env from '#start/env';

@inject()
export default class S3Service {
  public async getUrlFromKey(key: string): Promise<string> {
    const fileExists = await this.exists(key);
    if (!fileExists) {
      throw new FileDoesntExistError(key);
    }

    const url = `${env.get('MINIO_ENDPOINT')}/${env.get('MINIO_DEFAULT_BUCKETS')}/${key}`;
    return url;
  }

  public async exists(key: string): Promise<boolean> {
    return await drive.use().exists(key);
  }
}
