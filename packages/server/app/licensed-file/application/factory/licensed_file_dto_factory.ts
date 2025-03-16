import type { LicensedFileDTO } from '@president-challenge/shared/dist/licensed-file/licensed-file-dto.js';
import { inject } from '@adonisjs/core';
import type LicensedFile from '#licensed-file/domain/models/licensed_file';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import S3Service from '#common/services/s3_service';

@inject()
export class LicensedFileDTOFactory {
  constructor(
    private readonly s3Service: S3Service,
  ) {
  }

  public async createFromLicensedFile(licensedFile: LicensedFile): Promise<LicensedFileDTO> {
    return {
      identifier: licensedFile.identifier,
      title: licensedFile.title,
      attribution: licensedFile.attribution,
      source: licensedFile.source,
      license: licensedFile.license,
      date: licensedFile.date,
      url: await this.s3Service.getUrlFromKey(licensedFile.key),
      isVideo: licensedFile.isVideo,
    };
  }

  public createFromLicensedFiles(licensedFiles: LicensedFile[]): Promise<LicensedFileDTO[]> {
    const promises = licensedFiles.map((licensedFile: LicensedFile) => this.createFromLicensedFile(licensedFile));
    return Promise.all(promises);
  }
}
