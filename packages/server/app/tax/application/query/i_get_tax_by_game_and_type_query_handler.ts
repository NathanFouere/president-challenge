import type Tax from '#tax/domain/model/tax';
import type GetTaxByGameAndTypeQuery from '#tax/application/query/get_tax_by_game_and_type_query';

export default abstract class IGetTaxByGameAndTypeQueryHandler {
  public abstract handle(query: GetTaxByGameAndTypeQuery): Promise<Tax>;
}
