import SocialClass from '#social-class/domain/models/social_class';

export class SocialClassBuilder {
  private economicalSituation: number | null = null;
  private gameId: number | null = null;
  private sectorId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withEconomicalSituation(economicalSituation: number): this {
    this.economicalSituation = economicalSituation;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withSectorId(sectorId: number): this {
    this.sectorId = sectorId;
    return this;
  }

  build(): SocialClass {
    const socialClass = new SocialClass();
    if (!this.economicalSituation) throw new Error('economical Situation is required');
    else socialClass.economicalSituation = this.economicalSituation;
    if (this.gameId) socialClass.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.sectorId) socialClass.sectorId = this.sectorId;
    else throw new Error('Sector ID is required');
    if (this.definitionId) socialClass.definitionId = this.definitionId;
    else throw new Error('Definition ID is required');
    return socialClass;
  }
}

export function aSocialClass(): SocialClassBuilder {
  return new SocialClassBuilder();
}
