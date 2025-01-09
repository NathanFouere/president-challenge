import LawGroup from '#legislature/domain/models/law_group';

export class LawGroupBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private type: string | null = null;
  private gameId: number | null = null;

  public inGame(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public ofType(groupType: string): this {
    this.type = groupType;
    return this;
  }

  public named(name: string): this {
    this.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public build(): LawGroup {
    const lawGroup = new LawGroup();

    if (this.name !== null) lawGroup.name = this.name;
    else throw new Error('Name is required');
    if (this.description !== null) lawGroup.description = this.description;
    else throw new Error('Description is required');
    if (this.type !== null) lawGroup.type = this.type;
    else throw new Error('Group type is required');
    if (this.gameId !== null) lawGroup.gameId = this.gameId;
    else throw new Error('Game ID is required');

    return lawGroup;
  }
}

export function aLawGroup(): LawGroupBuilder {
  return new LawGroupBuilder();
}
