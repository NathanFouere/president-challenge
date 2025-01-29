import type SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';
import type SocialClass from '#social-class/domain/models/social_class';
import { aSocialClassFinancialFlow } from '#social-class/application/builders/social_class_financial_flow_builder';
import type Tax from '#tax/domain/model/tax';

export default class SocialClassFinancialFlowFactory {
  public createFromSectorRevenue(socialClass: SocialClass, generatedRevenue: number, turn: number): SocialClassFinancialFlow {
    return aSocialClassFinancialFlow()
      .withSocialClassId(socialClass.id)
      .withAmount(generatedRevenue)
      .withTurn(turn)
      .withColor('green')
      .withName('Sector')
      .build();
  }

  public createFromTax(socialClass: SocialClass, tax: Tax, taxAmount: number, turn: number): SocialClassFinancialFlow {
    return aSocialClassFinancialFlow()
      .withSocialClassId(socialClass.id)
      .withAmount(-taxAmount)
      .withTurn(turn)
      .withColor(tax.color)
      .withName(tax.name)
      .build();
  }
}
