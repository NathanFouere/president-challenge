import Law from '#law/domain/model/law';
import type { LawType } from '#law/domain/model/law_type';

export class LawBuilder {
  protected gameId: number | null = null;
  protected voted: boolean | null = null;
  protected order: number | null = null;
  protected lawGroupId: number | null = null;
  protected name: string | null = null;
  protected description: string | null = null;
  protected politicalWeightRequired: number | null = null;
  protected type: LawType | null = null;
  protected lawEffectIdentifier: string | null = null;

  public withLawEffectIdentifier(lawEffectIdentifier: string): this {
    this.lawEffectIdentifier = lawEffectIdentifier;
    return this;
  }

  public withPoliticalWeightRequired(politicalWeightRequired: number): this {
    this.politicalWeightRequired = politicalWeightRequired;
    return this;
  }

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withLawGroupId(lawGroupId: number): this {
    this.lawGroupId = lawGroupId;
    return this;
  }

  public forGame(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withVoted(voted: boolean): this {
    this.voted = voted;
    return this;
  }

  public withOrder(order: number): this {
    this.order = order;
    return this;
  }

  public withType(type: LawType): this {
    this.type = type;
    return this;
  }

  public build(): Law {
    const law = new Law();
    if (this.name !== null) law.name = this.name;
    else throw new Error('Name is required');
    if (this.description !== null) law.description = this.description;
    else throw new Error('Description is required');
    if (this.lawGroupId !== null) law.lawGroupId = this.lawGroupId;
    if (this.gameId) law.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.voted !== null) law.voted = this.voted;
    else throw new Error('Voted status is required');
    if (this.order !== null) law.order = this.order;
    else throw new Error('Order is required');
    if (this.politicalWeightRequired !== null) law.politicalWeightRequired = this.politicalWeightRequired;
    else throw new Error('Political weight required is required');
    if (this.type !== null) law.type = this.type;
    else throw new Error('Type is required');
    if (this.lawEffectIdentifier !== null) law.lawEffectIdentifier = this.lawEffectIdentifier;
    else throw new Error('Law effect identifier is required');
    return law;
  }

  public async exists(): Promise<Law> {
    const law = this.build();
    await law.save();
    return law;
  }
}

export function aLaw(): LawBuilder {
  return new LawBuilder();
}
