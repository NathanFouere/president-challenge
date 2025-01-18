import type LawVote from '#legislature/domain/models/law_vote';

export default abstract class ILawVoteRepository {
  public abstract save(lawVote: LawVote): Promise<void>;
}
