import type LawEffect from '#law/domain/model/law-effect/law_effect';

export default abstract class LawEffectBuilder {
  protected gameId: number | null = null;
  protected lawId: number | null = null;

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withLawId(lawId: number): this {
    this.lawId = lawId;
    return this;
  }

  protected abstract build(): LawEffect;
}
