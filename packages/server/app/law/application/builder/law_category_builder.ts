import LawCategory from '#law/domain/model/law_category';

export class LawCategoryBuilder {
  private name: string | null = null;
  private description: string | null = null;

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

    return lawCategory;
  }
}

export function aLawCategory(): LawCategoryBuilder {
  return new LawCategoryBuilder();
}
