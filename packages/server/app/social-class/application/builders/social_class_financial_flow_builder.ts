import FinancialFlowBuilder from '#common/builder/financial_flow_builder';
import SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';

export default class SocialClassFinancialFlowBuilder extends FinancialFlowBuilder {
  private socialClassFinancialFlowId: number | null = null;

  public withSocialClassFinancialFlowId(socialClassFinancialFlowId: number): this {
    this.socialClassFinancialFlowId = socialClassFinancialFlowId;
    return this;
  }

  public build(): SocialClassFinancialFlow {
    const financialFlow = new SocialClassFinancialFlow();

    if (this.amount !== null) financialFlow.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.color) financialFlow.color = this.color;
    else throw new Error('Color is required');
    if (this.name) financialFlow.name = this.name;
    else throw new Error('Name is required');
    if (this.socialClassFinancialFlowId) financialFlow.socialClassTurnFinancialFlowsId = this.socialClassFinancialFlowId;
    else throw new Error('Social class financial flow id is required');

    return financialFlow;
  }

  public async exist(): Promise<SocialClassFinancialFlow> {
    const financialFlow = this.build();
    await financialFlow.save();
    return financialFlow;
  }
}

export function aSocialClassFinancialFlow(): SocialClassFinancialFlowBuilder {
  return new SocialClassFinancialFlowBuilder();
}
