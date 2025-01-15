import PoliticalPartyVoteForLaw
  from '#legislature/domain/models/political_party_vote_for_law';

export default class PoliticalPartyVoteForLawBuilder {
  private politicalPartyId: number | null = null;
  private lawVoteResultsId: number | null = null;
  private votesFor: number | null = null;
  private votesAgainst: number | null = null;

  public withPoliticalPartyId(politicalPartyId: number): this {
    this.politicalPartyId = politicalPartyId;
    return this;
  }

  public withLawVoteResultsId(lawVoteResultsId: number): this {
    this.lawVoteResultsId = lawVoteResultsId;
    return this;
  }

  public withVotesFor(votesFor: number): this {
    this.votesFor = votesFor;
    return this;
  }

  public withVotesAgainst(votesAgainst: number): this {
    this.votesAgainst = votesAgainst;
    return this;
  }

  public build(): PoliticalPartyVoteForLaw {
    const politicalPartyVoteForLaw = new PoliticalPartyVoteForLaw();

    if (this.politicalPartyId !== null) politicalPartyVoteForLaw.politicalPartyId = this.politicalPartyId;
    else throw new Error('Political party is required');
    if (this.lawVoteResultsId !== null) politicalPartyVoteForLaw.lawVoteResultsId = this.lawVoteResultsId;
    else throw new Error('Law vote results id is required');
    if (this.votesFor !== null) politicalPartyVoteForLaw.votesFor = this.votesFor;
    else throw new Error('Votes for is required');
    if (this.votesAgainst !== null) politicalPartyVoteForLaw.votesAgainst = this.votesAgainst;
    else throw new Error('Votes against is required');

    return politicalPartyVoteForLaw;
  }

  public async exist(): Promise<PoliticalPartyVoteForLaw> {
    const politicalPartyVoteForLaw = this.build();

    await politicalPartyVoteForLaw.save();

    return politicalPartyVoteForLaw;
  }
}

export function aPoliticalPartyVoteForLaw(): PoliticalPartyVoteForLawBuilder {
  return new PoliticalPartyVoteForLawBuilder();
}
