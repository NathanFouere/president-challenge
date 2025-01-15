import type LawVotesPercentagePerPoliticalParty from '#legislature/domain/models/law_votes_percentage_per_political_party';

export abstract class ILawVotesPercentagePerPoliticalPartyRepository {
  abstract save(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty): Promise<void>;
  abstract createMany(lawVotesPercentagePerPoliticalParties: LawVotesPercentagePerPoliticalParty[]): Promise<void>;
}
