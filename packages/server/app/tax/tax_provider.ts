import AppProvider from '#common/provider';
import ITaxRepository from '#tax/domain/repository/i_tax_repository';
import IGetTaxByGameAndTypeQueryHandler from '#tax/application/query/i_get_tax_by_game_and_type_query_handler';

export default class TaxProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: TaxRepository } = await import(
      '#tax/infrastructure/repository/tax_repository'
    );

    const { default: GetTaxByGameAndTypeQueryHandler } = await import(
      '#tax/infrastructure/query/get_tax_by_game_and_type_query_handler'
    );

    this.app.container.bind(IGetTaxByGameAndTypeQueryHandler, () => {
      return new GetTaxByGameAndTypeQueryHandler();
    });

    this.app.container.bind(ITaxRepository, () => {
      return new TaxRepository();
    });
  }
}
