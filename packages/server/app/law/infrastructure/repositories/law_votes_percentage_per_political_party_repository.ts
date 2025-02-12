import type {
  ILawVotesPercentagePerPoliticalPartyRepository,
} from '#law/domain/repository/i_law_votes_percentage_per_political_party_repository';
import LawVotesPercentagePerPoliticalAffiliation from '#law/domain/model/law_votes_percentage_per_political_affiliation';

export default class LawVotesPercentagePerPoliticalPartyRepository implements ILawVotesPercentagePerPoliticalPartyRepository {
  public async save(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalAffiliation): Promise<void> {
    await lawVotesPercentagePerPoliticalParty.save();
  }

  public async createMany(lawVotesPercentagePerPoliticalParties: LawVotesPercentagePerPoliticalAffiliation[]): Promise<void> {
    await LawVotesPercentagePerPoliticalAffiliation.createMany(lawVotesPercentagePerPoliticalParties);
  }
}
