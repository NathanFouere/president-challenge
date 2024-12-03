import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileRepository } from '#licensed-file/infrastructure/repositories/licensed_file_repository';
import type LicensedFile from '#licensed-file/domain/models/licensed_file';
import licensedFileStartupConfig from '#game-config/licensed-file/licensed-file-create-config.json' assert { type: 'json' };
import { aLicensedFile } from '#licensed-file/application/builders/licensed_file_builder';

@inject()
export class LicensedFileCreationService {
  constructor(
    private readonly licensedFileRepository: LicensedFileRepository,
  ) {
  }

  public async initializeLicensedFiles(): Promise<void> {
    await this.licensedFileRepository.removeAll();

    const licensedFiles: LicensedFile[] = [];

    for (const licensedFileValues of licensedFileStartupConfig) {
      const licensedFile = aLicensedFile()
        .withIdentifier(licensedFileValues.identifier)
        .withAttribution(licensedFileValues.attribution)
        .withSource(licensedFileValues.source)
        .withLicense(licensedFileValues.licence)
        .withDate(licensedFileValues.date)
        .withPath(licensedFileValues.path)
        .withIsVideo(licensedFileValues.isVideo)
        .build();

      licensedFiles.push(licensedFile);
    }

    await this.licensedFileRepository.saveAll(licensedFiles);
  }
}
