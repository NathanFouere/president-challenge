import type LawVoteResults from '#law/domain/model/law_vote_results';

export abstract class ILawVoteResultsRepository {
  abstract save(legislatureVoteResults: LawVoteResults): Promise<void>;
}
