import type ISocialClassFinancialFlowRepository
  from '#social-class/domain/repository/i_social_class_financial_flow_repository';
import SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';

export default class SocialClassFinancialFlowRepository implements ISocialClassFinancialFlowRepository {
  public async save(socialClassFinancialFlow: SocialClassFinancialFlow): Promise<void> {
    await socialClassFinancialFlow.save();
  }

  public async createMany(socialClassFinancialFlows: SocialClassFinancialFlow[]): Promise<void> {
    await SocialClassFinancialFlow.createMany(socialClassFinancialFlows);
  }
}
