import { inject } from '@adonisjs/core';

import type LicensedFile from '#licensed-file/domain/models/licensed_file';
import licensedFileStartupConfig from '#game-config/licensed-file/licensed-file-create-config.json' assert { type: 'json' };
import { aLicensedFile } from '#licensed-file/application/builders/licensed_file_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILicensedFileRepository from '#licensed-file/domain/repository/i_licensed_file_repository';

@inject()
export class LicensedFileCreationService {
  constructor(
    private readonly licensedFileRepository: ILicensedFileRepository,
  ) {
  }

  public async initializeLicensedFiles(): Promise<void> {
    const licensedFiles: LicensedFile[] = [];

    for (const licensedFileValues of licensedFileStartupConfig) {
      const licensedFile = aLicensedFile()
        .withIdentifier(licensedFileValues.identifier)
        .withTitle(licensedFileValues.title)
        .withAttribution(licensedFileValues.attribution)
        .withSource(licensedFileValues.source)
        .withLicense(licensedFileValues.licence)
        .withDate(licensedFileValues.date)
        .withPath(licensedFileValues.path)
        .withIsVideo(licensedFileValues.isVideo)
        .build();

      licensedFiles.push(licensedFile);
    }

    await this.licensedFileRepository.saveOrUpdateAll(licensedFiles);
  }
}
