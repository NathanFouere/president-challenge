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

  public async removeAll(): Promise<void> {
    await LicensedFile.truncate();
  }

  public async saveAll(licensedFiles: LicensedFile[]): Promise<void> {
    await LicensedFile.createMany(licensedFiles);
  }
}
