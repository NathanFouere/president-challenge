import { inject } from '@adonisjs/core';
import type { TurnDataCache } from '#game/application/service/turn-service/load_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessService from '#social-class/domain/service/social_class_happiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyHappinessService from '#political-party/domain/service/political_party_happiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import HappinessModifierTurnGestionService
  from '#happiness-modifier/application/service/happiness_modifier_turn_gestion_service';

@inject()
export default class TurnHappinessService {
  constructor(
    private readonly happinessModifierTurnGestionService: HappinessModifierTurnGestionService,
    private readonly socialClassHappinessService: SocialClassHappinessService,
    private readonly politicalPartyHappinessService: PoliticalPartyHappinessService,
  ) {
  }

  public async passTurn(turnDataCache: TurnDataCache): Promise<void> {
    await this.happinessModifierTurnGestionService.processHappinessModifiersOfGame(turnDataCache.game.id);
    this.socialClassHappinessService.updateSocialClassesHappiness(turnDataCache.socialClasses);
    this.politicalPartyHappinessService.updatePoliticalPartiesHappiness(turnDataCache.politicalParties, turnDataCache.socialClassesPerType);
  }
}
