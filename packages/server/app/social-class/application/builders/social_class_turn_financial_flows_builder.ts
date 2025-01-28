import SocialClassTurnFinancialFlows from '#social-class/domain/models/social_class_turn_financial_flows';

export default class SocialClassTurnFinancialFlowsBuilder {
  private turn: number | null = null;
  private socialClassId: number | null = null;

  public withTurn(turn: number): this {
    this.turn = turn;
    return this;
  }

  public withSocialClassId(socialClassId: number): this {
    this.socialClassId = socialClassId;
    return this;
  }

  public build(): SocialClassTurnFinancialFlows {
    const socialClassTurnFinancialFlows = new SocialClassTurnFinancialFlows();

    if (this.turn) socialClassTurnFinancialFlows.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.socialClassId) socialClassTurnFinancialFlows.socialClassId = this.socialClassId;
    else throw new Error('Social class id is required');

    return socialClassTurnFinancialFlows;
  }

  public async exist(): Promise<SocialClassTurnFinancialFlows> {
    const socialClassTurnFinancialFlows = this.build();
    await socialClassTurnFinancialFlows.save();
    return socialClassTurnFinancialFlows;
  }
}

export function aSocialClassTurnFinancialFlows(): SocialClassTurnFinancialFlowsBuilder {
  return new SocialClassTurnFinancialFlowsBuilder();
}
