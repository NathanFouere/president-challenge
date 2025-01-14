import type {
  IPoliticalPartyVoteForLawRepository,
} from '#legislature/domain/repository/i_political_party_vote_for_law_repository';
import PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';

export default class PoliticalPartyVoteForLawRepository implements IPoliticalPartyVoteForLawRepository {
  public async save(legislaturePoliticalPartyVote: PoliticalPartyVoteForLaw): Promise<void> {
    await legislaturePoliticalPartyVote.save();
  }

  public async createMany(legislaturePoliticalPartyVotes: PoliticalPartyVoteForLaw[]): Promise<void> {
    await PoliticalPartyVoteForLaw.createMany(legislaturePoliticalPartyVotes);
  }
}
