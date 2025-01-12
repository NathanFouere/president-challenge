import LawVotesPercentagePerPoliticalParty from '#legislature/domain/models/law_votes_percentage_per_political_party';

export default class LawVotesPerPoliticalPartyBuilder {
  private politicalPartyId: number;
  private percentageVoteFor: number;

  public withPoliticalPartyId(politicalPartyId: number): LawVotesPerPoliticalPartyBuilder {
    this.politicalPartyId = politicalPartyId;
    return this;
  }

  public withPercentageVoteFor(percentageVoteFor: number): LawVotesPerPoliticalPartyBuilder {
    this.percentageVoteFor = percentageVoteFor;
    return this;
  }

  public build(): LawVotesPercentagePerPoliticalParty {
    const lawVotesPerPoliticalParty = new LawVotesPercentagePerPoliticalParty();

    if (this.politicalPartyId) {
      lawVotesPerPoliticalParty.politicalPartyId = this.politicalPartyId;
    }
    else {
      throw new Error('politicalPartyId is required');
    }

    if (this.percentageVoteFor !== null) {
      lawVotesPerPoliticalParty.percentageVoteFor = this.percentageVoteFor;
    }
    else {
      throw new Error('percentageVoteFor is required');
    }

    return lawVotesPerPoliticalParty;
  }
}

export function aLawVotesPerPoliticalParty(): LawVotesPerPoliticalPartyBuilder {
  return new LawVotesPerPoliticalPartyBuilder();
}
