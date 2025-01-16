import type GetLastLawVoteResultsInGameQuery from '#legislature/application/query/get_last_law_vote_results_in_game_query';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';

export abstract class IGetLastLawVoteResultsInGameQueryHandler {
  public abstract handle(query: GetLastLawVoteResultsInGameQuery): Promise<LawVoteResults | null>;
}
