import type { BudgetLevel } from '#state/domain/model/budget_level';
import Budget from '#state/domain/model/budget';

export default class BudgetBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private color: string | null = null;
  private level: BudgetLevel | null = null;
  private stateId: number | null = null;
  private licensedFileIdentifier: string | null = null;

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

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public withLicensedFileIdentifier(licensedFileIdentifier: string): this {
    this.licensedFileIdentifier = licensedFileIdentifier;
    return this;
  }

  public build(): Budget {
    const budget = new Budget();

    if (this.name) budget.name = this.name;
    else throw new Error('Name is required');
    if (this.description) budget.description = this.description;
    else throw new Error('Description is required');
    if (this.level) budget.level = this.level;
    else throw new Error('Base cost is required');
    if (this.stateId) budget.stateId = this.stateId;
    else throw new Error('State id is required');
    if (this.color) budget.color = this.color;
    else throw new Error('Color is required');
    if (this.licensedFileIdentifier) budget.licensedFileIdentifier = this.licensedFileIdentifier;
    else throw new Error('Licensed file identifier is required');

    return budget;
  }
}

export function aBudget(): BudgetBuilder {
  return new BudgetBuilder();
}
