import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
import LawVotesPercentagePerPoliticalAffiliation from '#law/domain/model/law_votes_percentage_per_political_affiliation';

export default class LawVotesPerPoliticalAffiliationBuilder {
  private lawId: number | null = null;
  private politicalAffiliation: PoliticalAffiliation | null = null;
  private percentage: number | null = null;

  public withLawId(lawId: number): this {
    this.lawId = lawId;
    return this;
  }

  public withPoliticalAffiliation(politicalPartyAffiliation: PoliticalAffiliation): this {
    this.politicalAffiliation = politicalPartyAffiliation;

    return this;
  }

  public withPercentage(percentage: number): this {
    this.percentage = percentage;

    return this;
  }

  public build(): LawVotesPercentagePerPoliticalAffiliation {
    const lawVotesPerPoliticalParty = new LawVotesPercentagePerPoliticalAffiliation();

    if (this.lawId !== null) lawVotesPerPoliticalParty.lawDefinitionId = this.lawId;
    else throw new Error('LawVotesPerPoliticalPartyBuilder: lawId is required');
    if (this.politicalAffiliation !== null) lawVotesPerPoliticalParty.politicalAffiliation = this.politicalAffiliation;
    else throw new Error('LawVotesPerPoliticalPartyBuilder: politicalPartyId is required');
    if (this.percentage !== null) lawVotesPerPoliticalParty.percentage = this.percentage;
    else throw new Error('LawVotesPerPoliticalPartyBuilder: percentage is required');

    return lawVotesPerPoliticalParty;
  }
}

export function aLawVotesPerPoliticalAffiliation(): LawVotesPerPoliticalAffiliationBuilder {
  return new LawVotesPerPoliticalAffiliationBuilder();
}
