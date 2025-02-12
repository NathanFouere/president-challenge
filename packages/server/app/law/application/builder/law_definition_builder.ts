import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import LawDefinition from '#law/domain/model/law_definition';
import type { LawType } from '#law/domain/model/law_type';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export class LawDefinitionBuilder {
  protected votedByDefault: boolean | null = null;
  protected order: number | null = null;
  protected lawGroupId: number | null = null;
  protected name: string | null = null;
  protected description: string | null = null;
  protected politicalWeightRequired: number | null = null;
  protected type: LawType | null = null;
  private budgetTypeToChange: BudgetType | null = null;
  private budgetLevelToChange: BudgetLevel | null = null;
  private sectorTypeToChange: SectorTypes | null = null;
  private ownershipTypeToChange: SectorOwnershipType | null = null;
  private taxTypeToChange: TaxType | null = null;
  private taxLevelToChange: TaxLevel | null = null;

  public withBudgetTypeToChange(budgetTypeToChange: BudgetType | null): this {
    this.budgetTypeToChange = budgetTypeToChange;
    return this;
  }

  public withBudgetLevelToChange(budgetLevelToChange: BudgetLevel | null): this {
    this.budgetLevelToChange = budgetLevelToChange;
    return this;
  }

  public withSectorTypeToChange(sectorTypeToChange: SectorTypes | null): this {
    this.sectorTypeToChange = sectorTypeToChange;
    return this;
  }

  public withSectorOwnershipTypeToChange(ownershipTypeToChange: SectorOwnershipType | null): this {
    this.ownershipTypeToChange = ownershipTypeToChange;
    return this;
  }

  public withTaxTypeToChange(taxTypeToChange: TaxType | null): this {
    this.taxTypeToChange = taxTypeToChange;
    return this;
  }

  public withTaxLevelToChange(taxLevelToChange: TaxLevel | null): this {
    this.taxLevelToChange = taxLevelToChange;
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

  public withVoted(voted: boolean): this {
    this.votedByDefault = voted;
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

  public build(): LawDefinition {
    const law = new LawDefinition();
    if (this.name !== null) law.name = this.name;
    else throw new Error('Name is required');
    if (this.description !== null) law.description = this.description;
    else throw new Error('Description is required');
    if (this.lawGroupId !== null) law.lawGroupId = this.lawGroupId;
    if (this.order !== null) law.order = this.order;
    else throw new Error('Order is required');
    if (this.politicalWeightRequired !== null) law.politicalWeightRequired = this.politicalWeightRequired;
    else throw new Error('Political weight required is required');
    if (this.type !== null) law.type = this.type;
    else throw new Error('Type is required');
    if (this.votedByDefault !== null) law.votedByDefault = this.votedByDefault;
    else throw new Error('Voted by default is required');
    if (this.budgetTypeToChange !== null) law.budgetTypeToChange = this.budgetTypeToChange;
    if (this.budgetLevelToChange !== null) law.budgetLevelToChange = this.budgetLevelToChange;
    if (this.sectorTypeToChange !== null) law.sectorTypeToChange = this.sectorTypeToChange;
    if (this.ownershipTypeToChange !== null) law.sectorOwnershipTypeToChange = this.ownershipTypeToChange;
    if (this.taxTypeToChange !== null) law.taxTypeToChange = this.taxTypeToChange;
    if (this.taxLevelToChange !== null) law.taxLevelToChange = this.taxLevelToChange;
    return law;
  }

  public async exists(): Promise<LawDefinition> {
    const law = this.build();
    await law.save();
    return law;
  }
}

export function aLawDefinition(): LawDefinitionBuilder {
  return new LawDefinitionBuilder();
}
