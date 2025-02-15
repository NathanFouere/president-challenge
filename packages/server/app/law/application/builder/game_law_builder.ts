import Law from '#law/domain/model/law';

export default class LawBuilder {
  private lawDefinitionId: number | null = null;
  private gameId: number | null = null;
  private voted: boolean | null = null;

  public withLawDefinitionId(lawDefinitionId: number): LawBuilder {
    this.lawDefinitionId = lawDefinitionId;
    return this;
  }

  public withGameId(gameId: number): LawBuilder {
    this.gameId = gameId;
    return this;
  }

  public withVoted(voted: boolean): LawBuilder {
    this.voted = voted;
    return this;
  }

  public build(): Law {
    const gameLaw = new Law();
    if (this.lawDefinitionId === null) {
      throw new Error('Law ID is required');
    }
    else {
      gameLaw.definitionId = this.lawDefinitionId;
    }

    if (this.gameId === null) {
      throw new Error('Game ID is required');
    }
    else {
      gameLaw.gameId = this.gameId;
    }

    if (this.voted === null) {
      throw new Error('Voted is required');
    }
    else {
      gameLaw.voted = this.voted;
    }

    return gameLaw;
  }

  public async exists(): Promise<Law> {
    const gameLaw = this.build();
    await gameLaw.save();
    return gameLaw;
  }
}

export function aLaw(): LawBuilder {
  return new LawBuilder();
}
