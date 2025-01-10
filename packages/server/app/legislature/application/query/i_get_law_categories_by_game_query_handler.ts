import type LawCategory from '#legislature/domain/models/law_category';
import type GetLawCategoriesByGameQuery from '#legislature/application/query/get_law_categories_by_game_query';

export default abstract class IGetLawCategoriesByGameQueryHandler {
  public abstract handle(query: GetLawCategoriesByGameQuery): Promise<LawCategory[]>;
}
