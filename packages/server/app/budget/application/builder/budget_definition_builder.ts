import type { BudgetLevel } from '#budget/domain/model/budget_level';
import type { BudgetType } from '#budget/domain/model/budget_type';
import BudgetDefinition from '#budget/domain/model/budget_definition';

export default class BudgetDefinitionBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private color: string | null = null;
  private level: BudgetLevel | null = null;
  private type: BudgetType | null = null;
  private licensedFileIdentifier: string | null = null;

  public withType(type: BudgetType): this {
    this.type = type;
    return this;
  }

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withColor(color: string): this {
    this.color = color;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withLevel(level: BudgetLevel): this {
    this.level = level;
    return this;
  }

  public withLicensedFileIdentifier(licensedFileIdentifier: string): this {
    this.licensedFileIdentifier = licensedFileIdentifier;
    return this;
  }

  public build(): BudgetDefinition {
    const budget = new BudgetDefinition();

    if (this.name) budget.name = this.name;
    else throw new Error('Name is required');
    if (this.description) budget.description = this.description;
    else throw new Error('Description is required');
    if (this.level) budget.defaultLevel = this.level;
    else throw new Error('Base cost is required');
    if (this.color) budget.color = this.color;
    else throw new Error('Color is required');
    if (this.licensedFileIdentifier) budget.licensedFileIdentifier = this.licensedFileIdentifier;
    else throw new Error('Licensed file identifier is required');
    if (this.type) budget.type = this.type;
    else throw new Error('type is required');

    return budget;
  }
}

export function aBudgetDefinition(): BudgetDefinitionBuilder {
  return new BudgetDefinitionBuilder();
}
