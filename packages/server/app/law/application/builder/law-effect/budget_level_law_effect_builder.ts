import LawEffectBuilder from '#law/application/builder/law-effect/law_effect_builder';
import BudgetLevelLawEffect from '#law/domain/model/law-effect/budget_level_law_effect';

export default class BudgetLevelLawEffectBuilder extends LawEffectBuilder {
  private budgetId: number | null = null;
  private level: number | null = null;

  withBudgetId(budgetId: number): this {
    this.budgetId = budgetId;
    return this;
  }

  withLevel(level: number): this {
    this.level = level;
    return this;
  }

  public build(): BudgetLevelLawEffect {
    const budgetLevelLawEffect = new BudgetLevelLawEffect();
    if (this.gameId !== null) budgetLevelLawEffect.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.lawId !== null) budgetLevelLawEffect.lawId = this.lawId;
    else throw new Error('Law ID is required');
    if (this.budgetId !== null) budgetLevelLawEffect.budgetId = this.budgetId;
    else throw new Error('Budget ID is required');
    if (this.level !== null) budgetLevelLawEffect.level = this.level;
    else throw new Error('Level is required');

    return budgetLevelLawEffect;
  }

  public async exists(): Promise<BudgetLevelLawEffect> {
    const budgetLevelLawEffect = this.build();
    await budgetLevelLawEffect.save();
    return budgetLevelLawEffect;
  }
}

export function aBudgetLevelLawEffect(): BudgetLevelLawEffectBuilder {
  return new BudgetLevelLawEffectBuilder();
}
