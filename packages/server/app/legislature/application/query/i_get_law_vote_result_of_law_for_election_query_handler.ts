import type LawVoteResults from '#legislature/domain/models/law_vote_results';
import type GetLawVoteResultOfLawForElectionQuery
  from '#legislature/application/query/get_law_vote_result_of_law_for_turn_query';

export abstract class IGetLegislatureVoteResultOfLawForElectionQueryHandler {
  public abstract handle(getLawVoteResultOfLawForElectionQuery: GetLawVoteResultOfLawForElectionQuery): Promise<LawVoteResults>;
}
