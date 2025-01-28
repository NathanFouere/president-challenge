import type FinancialFlow from '#common/model/financial_flow';

export default abstract class FinancialFlowBuilder {
  protected amount: number | null = null;
  protected color: string | null = null;
  protected name: string | null = null;

  public withAmount(amount: number): this {
    this.amount = amount;
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

  public abstract build(): FinancialFlow;
}
