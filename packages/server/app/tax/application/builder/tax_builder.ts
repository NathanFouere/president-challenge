import Tax from '#tax/domain/model/tax';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export default class TaxBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private type: TaxType | null = null;
  private level: TaxLevel | null = null;
  private stateId: number | null = null;

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
    if (this.name != null) tax.name = this.name;
    else throw new Error('Name is required');
    if (this.description != null) tax.description = this.description;
    else throw new Error('Description is required');
    if (this.type != null) tax.type = this.type;
    else throw new Error('Type is required');
    if (this.level != null) tax.level = this.level;
    else throw new Error('Level is required');
    if (this.stateId != null) tax.stateId = this.stateId;
    else throw new Error('State ID is required');
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
