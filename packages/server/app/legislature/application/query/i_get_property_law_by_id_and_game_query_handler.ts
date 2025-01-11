import type { GetPropertyLawByIdAndGameQuery } from '#legislature/application/query/get_property_law_by_id_and_game_query';
import type PropertyLaw from '#legislature/domain/models/property_law';

export default abstract class IGetPropertyLawByIdAndGameQueryHandler {
  public abstract handle(query: GetPropertyLawByIdAndGameQuery): Promise<PropertyLaw>;
}
