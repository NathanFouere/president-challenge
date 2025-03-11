import type { LicensedFileDTO } from '@president-challenge/shared/dist/licensed-file/licensed-file-dto.js';
import type LicensedFile from '#licensed-file/domain/models/licensed_file';

export class LicensedFileDTOFactory {
  public createFromLicensedFile(licensedFile: LicensedFile): LicensedFileDTO {
    return {
      identifier: licensedFile.identifier,
      title: licensedFile.title,
      attribution: licensedFile.attribution,
      source: licensedFile.source,
      license: licensedFile.license,
      date: licensedFile.date,
      path: licensedFile.path,
      isVideo: licensedFile.isVideo,
    };
  }

  public createFromLicensedFiles(licensedFiles: LicensedFile[]): LicensedFileDTO[] {
    return licensedFiles.map(licensedFile => this.createFromLicensedFile(licensedFile));
  }
}
