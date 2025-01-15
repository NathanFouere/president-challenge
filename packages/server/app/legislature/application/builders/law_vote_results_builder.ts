import LawVoteResults from '#legislature/domain/models/law_vote_results';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class LawVoteResultsBuilder {
  private turn: number | null = null;
  private lawId: number | null = null;
  private legislatureType: LegislatureType | null = null;

  public withTurn(turn: number): this {
    this.turn = turn;
    return this;
  }

  public withLawId(lawId: number): this {
    this.lawId = lawId;
    return this;
  }

  public withLegislatureType(legislatureType: LegislatureType): this {
    this.legislatureType = legislatureType;
    return this;
  }

  public build(): LawVoteResults {
    const lawVoteResults = new LawVoteResults();
    if (this.turn !== null) lawVoteResults.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.lawId !== null) lawVoteResults.lawId = this.lawId;
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
