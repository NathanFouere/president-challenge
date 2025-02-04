import type ILawVoteRepository from '#law/domain/repository/i_law_vote_repository';
import type LawVote from '#law/domain/model/law_vote';

export default class LawVoteRepository implements ILawVoteRepository {
  public async save(lawVote: LawVote): Promise<void> {
    await lawVote.save();
  }
}
