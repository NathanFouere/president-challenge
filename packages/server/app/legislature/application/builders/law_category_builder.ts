import LawCategory from '#legislature/domain/models/law_category';

export class LawCategoryBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private gameId: number | null = null;

  public inGame(gameId: number): this {
    this.gameId = gameId;
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

  public build(): LawCategory {
    const lawCategory = new LawCategory();

    if (this.name !== null) lawCategory.name = this.name;
    else throw new Error('Name is required');
    if (this.description !== null) lawCategory.description = this.description;
    else throw new Error('Description is required');
    if (this.gameId !== null) lawCategory.gameId = this.gameId;
    else throw new Error('Game ID is required');

    return lawCategory;
  }
}

export function aLawCategory(): LawCategoryBuilder {
  return new LawCategoryBuilder();
}
