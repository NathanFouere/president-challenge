import PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyBuilder {
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public build(): PoliticalParty {
    const politicalParty = new PoliticalParty();

    if (this.gameId !== null) {
      politicalParty.gameId = this.gameId;
    }
    else {
      throw new Error('game is required');
    }

    if (this.definitionId !== null) {
      politicalParty.definitionId = this.definitionId;
    }
    else {
      throw new Error('definition is required');
    }

    return politicalParty;
  }
}

export function aPoliticalParty(): PoliticalPartyBuilder {
  return new PoliticalPartyBuilder();
}
