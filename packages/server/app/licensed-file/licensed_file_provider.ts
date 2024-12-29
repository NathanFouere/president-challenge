import AppProvider from '#common/provider';
import ILicensedFileRepository from '#licensed-file/domain/repository/i_licensed_file_repository';

export default class LicensedFileProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: LicensedFileRepository } = await import(
      '#licensed-file/infrastructure/repositories/licensed_file_repository'
    );

    this.app.container.bind(ILicensedFileRepository, () => {
      return new LicensedFileRepository();
    });
  }
}
