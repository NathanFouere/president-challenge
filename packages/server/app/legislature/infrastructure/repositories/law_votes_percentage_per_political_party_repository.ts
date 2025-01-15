import type {
  ILawVotesPercentagePerPoliticalPartyRepository,
} from '#legislature/domain/repository/i_law_votes_percentage_per_political_party_repository';
import LawVotesPercentagePerPoliticalParty from '#legislature/domain/models/law_votes_percentage_per_political_party';

export default class LawVotesPercentagePerPoliticalPartyRepository implements ILawVotesPercentagePerPoliticalPartyRepository {
  public async save(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty): Promise<void> {
    await lawVotesPercentagePerPoliticalParty.save();
  }

  public async createMany(lawVotesPercentagePerPoliticalParties: LawVotesPercentagePerPoliticalParty[]): Promise<void> {
    await LawVotesPercentagePerPoliticalParty.createMany(lawVotesPercentagePerPoliticalParties);
  }
}
