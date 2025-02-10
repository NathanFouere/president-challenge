import type Law from '#law/domain/model/law';
import type GetIncompatibleLawsQuery from '#law/application/query/get_incompatible_laws_query';

export default abstract class IGetIncompatibleLawsQueryHandler {
  public abstract handle(query: GetIncompatibleLawsQuery): Promise<Law[]>;
}
