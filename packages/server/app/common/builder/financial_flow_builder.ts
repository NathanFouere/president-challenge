import type FinancialFlow from '#common/model/financial_flow';
import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';

export default abstract class FinancialFlowBuilder extends SaveAmountForTurnBuilder {
  protected color: string | null = null;
  protected name: string | null = null;

  public withColor(color: string): this {
    this.color = color;
    return this;
  }

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public abstract build(): FinancialFlow;
}
