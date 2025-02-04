import type LawCategory from '#law/domain/model/law_category';
import type GetLawCategoriesByGameQuery from '#law/application/query/get_law_categories_by_game_query';

export default abstract class IGetLawCategoriesByGameQueryHandler {
  public abstract handle(query: GetLawCategoriesByGameQuery): Promise<LawCategory[]>;
}
