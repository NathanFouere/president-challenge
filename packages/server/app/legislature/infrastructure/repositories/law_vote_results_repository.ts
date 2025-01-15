import type { ILawVoteResultsRepository } from '#legislature/domain/repository/i_law_vote_results_repository';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';

export default class LawVoteResultsRepository implements ILawVoteResultsRepository {
  public async save(legislatureVoteResults: LawVoteResults): Promise<void> {
    await legislatureVoteResults.save();
  }
}
