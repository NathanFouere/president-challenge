import LawVoteResults from '#legislature/domain/models/law_vote_results';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class LawVoteResultsBuilder {
  private lawVoteId: number | null = null;
  private legislatureType: LegislatureType | null = null;

  public withLawVoteId(lawVoteId: number): this {
    this.lawVoteId = lawVoteId;
    return this;
  }

  public withLegislatureType(legislatureType: LegislatureType): this {
    this.legislatureType = legislatureType;
    return this;
  }

  public build(): LawVoteResults {
    const lawVoteResults = new LawVoteResults();
    if (this.lawVoteId !== null) lawVoteResults.lawVoteId = this.lawVoteId;
    else throw new Error('Law id is required');
    if (this.legislatureType !== null) lawVoteResults.legislatureType = this.legislatureType;
    else throw new Error('Legislature type is required');

    return lawVoteResults;
  }

  public async exist(): Promise<LawVoteResults> {
    const lawVoteResults = this.build();
    await lawVoteResults.save();
    return lawVoteResults;
  }
}

export function aLawVoteResult(): LawVoteResultsBuilder {
  return new LawVoteResultsBuilder();
}
