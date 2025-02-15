import Tax from '#tax/domain/model/tax';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export default class TaxBuilder {
  private level: TaxLevel | null = null;
  private stateId: number | null = null;
  private baseRate: number | null = null;
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withBaseRate(baseRate: number): this {
    this.baseRate = baseRate;
    return this;
  }

  public withLevel(level: TaxLevel): this {
    this.level = level;
    return this;
  }

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public build(): Tax {
    const tax = new Tax();
    if (this.level != null) tax.level = this.level;
    else throw new Error('Level is required');
    if (this.stateId != null) tax.stateId = this.stateId;
    else throw new Error('State ID is required');
    if (this.baseRate != null) tax.rate = this.baseRate;
    else throw new Error('Base rate is required');
    if (this.gameId != null) tax.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.definitionId != null) tax.definitionId = this.definitionId;
    else throw new Error('Definition ID is required');
    return tax;
  }

  public async exists(): Promise<Tax> {
    const tax = this.build();
    await tax.save();

    return tax;
  }
}

export function aTax(): TaxBuilder {
  return new TaxBuilder();
}
