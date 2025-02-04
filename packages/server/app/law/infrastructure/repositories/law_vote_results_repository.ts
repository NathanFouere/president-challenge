import type { ILawVoteResultsRepository } from '#law/domain/repository/i_law_vote_results_repository';
import type LawVoteResults from '#law/domain/model/law_vote_results';

export default class LawVoteResultsRepository implements ILawVoteResultsRepository {
  public async save(legislatureVoteResults: LawVoteResults): Promise<void> {
    await legislatureVoteResults.save();
  }
}
