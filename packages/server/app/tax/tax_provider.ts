import AppProvider from '#common/provider';
import ITaxRepository from '#tax/domain/repository/i_tax_repository';

export default class TaxProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: TaxRepository } = await import(
      '#tax/infrastructure/repository/tax_repository'
    );

    this.app.container.bind(ITaxRepository, () => {
      return new TaxRepository();
    });
  }
}
