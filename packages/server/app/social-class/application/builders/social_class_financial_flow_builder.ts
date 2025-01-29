import FinancialFlowBuilder from '#common/builder/financial_flow_builder';
import SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';

export default class SocialClassFinancialFlowBuilder extends FinancialFlowBuilder {
  private socialClassId: number | null = null;

  public withSocialClassId(socialClassId: number): this {
    this.socialClassId = socialClassId;
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
    if (this.socialClassId) financialFlow.socialClassId = this.socialClassId;
    else throw new Error('Social class  id is required');
    if (this.turn) financialFlow.turn = this.turn;
    else throw new Error('Turn is required');

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
