import LawGroup from '#law/domain/model/law_group';

export class LawGroupBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private lawCategoryId: number | null = null;

  public inCategory(lawCategoryId: number): this {
    this.lawCategoryId = lawCategoryId;
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
    if (this.lawCategoryId !== null) lawGroup.lawCategoryId = this.lawCategoryId;
    else throw new Error('Law category ID is required');

    return lawGroup;
  }
}

export function aLawGroup(): LawGroupBuilder {
  return new LawGroupBuilder();
}
