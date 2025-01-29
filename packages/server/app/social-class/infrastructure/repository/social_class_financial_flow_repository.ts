import type ISocialClassFinancialFlowRepository
  from '#social-class/domain/repository/i_social_class_financial_flow_repository';
import type SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';

export default class SocialClassFinancialFlowRepository implements ISocialClassFinancialFlowRepository {
  public async save(socialClassFinancialFlow: SocialClassFinancialFlow): Promise<void> {
    await socialClassFinancialFlow.save();
  }
}
