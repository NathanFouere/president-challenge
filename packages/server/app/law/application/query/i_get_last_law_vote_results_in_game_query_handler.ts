import type GetLastLawVoteResultsInGameQuery from '#law/application/query/get_last_law_vote_results_in_game_query';
import type LawVoteResults from '#law/domain/model/law_vote_results';

export abstract class IGetLastLawVoteResultsInGameQueryHandler {
  public abstract handle(query: GetLastLawVoteResultsInGameQuery): Promise<LawVoteResults | null>;
}
