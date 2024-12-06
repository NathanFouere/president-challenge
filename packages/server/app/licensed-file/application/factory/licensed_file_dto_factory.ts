import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto.js';
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
}
