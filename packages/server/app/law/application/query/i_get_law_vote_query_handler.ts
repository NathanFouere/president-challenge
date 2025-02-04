import type { GetLawVoteQuery } from '#law/application/query/get_law_vote_query';
import type LawVote from '#law/domain/model/law_vote';

export default abstract class IGetLawVoteQueryHandler {
  abstract handle(query: GetLawVoteQuery): Promise<LawVote>;
}
