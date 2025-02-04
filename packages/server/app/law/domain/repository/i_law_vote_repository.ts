import type LawVote from '#law/domain/model/law_vote';

export default abstract class ILawVoteRepository {
  public abstract save(lawVote: LawVote): Promise<void>;
}
