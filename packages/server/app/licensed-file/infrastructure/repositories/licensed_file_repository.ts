import LicensedFile from '#licensed-file/domain/models/licensed_file';

export class LicensedFileRepository {
  public async save(licensedFile: LicensedFile): Promise<void> {
    await licensedFile.save();
  }

  public async findByIdentifier(identifier: string): Promise<LicensedFile | null> {
    return await LicensedFile.findBy('identifier', identifier);
  }

  public async getByIdentifier(identifier: string): Promise<LicensedFile> {
    const licensedFile = await this.findByIdentifier(identifier);

    if (licensedFile === null) {
      throw new Error(`LicensedFile with identifier ${identifier} not found`);
    }

    return licensedFile;
  }

  public async truncate(): Promise<void> {
    await LicensedFile.truncate();
  }

  public async saveOrUpdateAll(licensedFiles: LicensedFile[]): Promise<void> {
    for (const licensedFile of licensedFiles) {
      const existingFile = await this.findByIdentifier(licensedFile.identifier);

      if (existingFile) {
        existingFile.merge(licensedFile.$attributes);
        await existingFile.save();
      }
      else {
        await licensedFile.save();
      }
    }
  }
}
