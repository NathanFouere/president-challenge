import type LawVotesPercentagePerPoliticalAffiliation from '#law/domain/model/law_votes_percentage_per_political_affiliation';

export abstract class ILawVotesPercentagePerPoliticalPartyRepository {
  abstract save(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalAffiliation): Promise<void>;
  abstract createMany(lawVotesPercentagePerPoliticalParties: LawVotesPercentagePerPoliticalAffiliation[]): Promise<void>;
}
