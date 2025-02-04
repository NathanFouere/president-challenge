import { Exception } from '@adonisjs/core/exceptions';
import LawVote from '#law/domain/model/law_vote';

export default class LawVoteBuilder {
  private turn: number | null = null;
  private lawId: number | null = null;

  public withTurn(turn: number): this {
    this.turn = turn;

    return this;
  }

  public withLawId(lawId: number): this {
    this.lawId = lawId;

    return this;
  }

  public build(): LawVote {
    const lawVote = new LawVote();
    if (this.turn !== null) lawVote.turn = this.turn;
    else throw new Exception('Turn must be defined');
    if (this.lawId !== null) lawVote.lawId = this.lawId;
    else throw new Exception('Law id must be defined');

    return lawVote;
  }

  public async exist(): Promise<LawVote> {
    const lawVote = this.build();
    await lawVote.save();
    return lawVote;
  }
}

export function aLawVote(): LawVoteBuilder {
  return new LawVoteBuilder();
}
