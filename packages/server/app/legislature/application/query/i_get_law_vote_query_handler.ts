import type { GetLawVoteQuery } from '#legislature/application/query/get_law_vote_query';
import type LawVote from '#legislature/domain/models/law_vote';

export default abstract class IGetLawVoteQueryHandler {
  abstract handle(query: GetLawVoteQuery): Promise<LawVote>;
}
