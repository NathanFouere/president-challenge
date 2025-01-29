import type SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';

export default abstract class ISocialClassFinancialFlowRepository {
  abstract save(socialClassFinancialFlow: SocialClassFinancialFlow): Promise<void>;
}
