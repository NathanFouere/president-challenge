import LawVotesPercentagePerPoliticalParty from '#law/domain/model/law_votes_percentage_per_political_party';

export default class LawVotesPerPoliticalPartyBuilder {
  private lawId: number | null = null;
  private politicalPartyId: number | null = null;
  private percentage: number | null = null;

  public withLawId(lawId: number): this {
    this.lawId = lawId;
    return this;
  }

  public withPoliticalPartyId(politicalPartyId: number): this {
    this.politicalPartyId = politicalPartyId;

    return this;
  }

  public withPercentage(percentage: number): this {
    this.percentage = percentage;

    return this;
  }

  public build(): LawVotesPercentagePerPoliticalParty {
    const lawVotesPerPoliticalParty = new LawVotesPercentagePerPoliticalParty();

    if (this.lawId !== null) lawVotesPerPoliticalParty.lawId = this.lawId;
    else throw new Error('LawVotesPerPoliticalPartyBuilder: lawId is required');
    if (this.politicalPartyId !== null) lawVotesPerPoliticalParty.politicalPartyId = this.politicalPartyId;
    else throw new Error('LawVotesPerPoliticalPartyBuilder: politicalPartyId is required');
    if (this.percentage !== null) lawVotesPerPoliticalParty.percentage = this.percentage;
    else throw new Error('LawVotesPerPoliticalPartyBuilder: percentage is required');

    return lawVotesPerPoliticalParty;
  }
}

export function aLawVotesPerPoliticalParty(): LawVotesPerPoliticalPartyBuilder {
  return new LawVotesPerPoliticalPartyBuilder();
}
