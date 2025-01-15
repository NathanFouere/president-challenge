import type LawVoteResults from '#legislature/domain/models/law_vote_results';

export abstract class ILawVoteResultsRepository {
  abstract save(legislatureVoteResults: LawVoteResults): Promise<void>;
}
