import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import sectorEconomicalSituationMatchConfig
  from '#game-config/sector/sector-economical-situation-match-config.json' assert {type: 'json'};
import type { SocialClassTurnContext } from '#game/application/service/turn-service/load_turn_data_context_service';
import { aSocialClassFinancialFlow } from '#social-class/application/builders/social_class_financial_flow_builder';

export default class SocialClassEconomicalSituationEvolutionService {
  public async updateSocialClassesEconomicalSituation(socialClassTurnContexts: SocialClassTurnContext[]): Promise<void> {
    await Promise.all(socialClassTurnContexts.map(socialClassTurnContext => this.propagateSectorEconomicalSituationToSocialClass(socialClassTurnContext)));
  }

  private async propagateSectorEconomicalSituationToSocialClass(socialClassTurnContext: SocialClassTurnContext): Promise<void> {
    let revenuesFromSectors;
    const sector = socialClassTurnContext.socialClass.sector;
    switch (socialClassTurnContext.socialClass.type) {
      case SocialClassTypes.CAPITALIST:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PETIT_BOURGEOIS:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PROLETARIAT:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].worker;
        break;
    }

    await aSocialClassFinancialFlow()
      .withSocialClassFinancialFlowId(socialClassTurnContext.socialClassTurnFinancialFlows.id)
      .withAmount(revenuesFromSectors)
      .withColor('green')
      .withName('Sector')
      .exist();

    socialClassTurnContext.socialClass.addEconomicalSituation(revenuesFromSectors);
  }
}
