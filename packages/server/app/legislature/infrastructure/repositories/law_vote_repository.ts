import type ILawVoteRepository from '#legislature/domain/repository/i_law_vote_repository';
import type LawVote from '#legislature/domain/models/law_vote';

export default class LawVoteRepository implements ILawVoteRepository {
  public async save(lawVote: LawVote): Promise<void> {
    await lawVote.save();
  }
}
