import type LicensedFile from '#licensed-file/domain/models/licensed_file';

export default abstract class ILicensedFileRepository {
  public abstract save(licensedFile: LicensedFile): Promise<void>;
  public abstract findByIdentifier(identifier: string): Promise<LicensedFile | null>;
  public abstract getByIdentifier(identifier: string): Promise<LicensedFile>;
  public abstract truncate(): Promise<void>;
  public abstract saveOrUpdateAll(licensedFiles: LicensedFile[]): Promise<void>;
}
