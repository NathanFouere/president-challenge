import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import TaxDefinition from '#tax/domain/model/tax_definition';

export default class TaxDefinitionBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private type: TaxType | null = null;
  private defaultLevel: TaxLevel | null = null;
  private baseRate: number | null = null;
  private color: string | null = null;

  public withBaseRate(baseRate: number): this {
    this.baseRate = baseRate;
    return this;
  }

  public withColor(color: string): this {
    this.color = color;
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

  public withType(type: TaxType): this {
    this.type = type;
    return this;
  }

  public withDefaultLevel(level: TaxLevel): this {
    this.defaultLevel = level;
    return this;
  }

  public build(): TaxDefinition {
    const tax = new TaxDefinition();
    if (this.name != null) tax.name = this.name;
    else throw new Error('Name is required');
    if (this.description != null) tax.description = this.description;
    else throw new Error('Description is required');
    if (this.type != null) tax.type = this.type;
    else throw new Error('Type is required');
    if (this.baseRate != null) tax.defaultRate = this.baseRate;
    else throw new Error('Base rate is required');
    if (this.color != null) tax.color = this.color;
    else throw new Error('Color is required');
    if (this.defaultLevel != null) tax.defaultLevel = this.defaultLevel;
    else throw new Error('Default level is required');
    return tax;
  }

  public async exists(): Promise<TaxDefinition> {
    const tax = this.build();
    await tax.save();

    return tax;
  }
}

export function aTaxDefinition(): TaxDefinitionBuilder {
  return new TaxDefinitionBuilder();
}
