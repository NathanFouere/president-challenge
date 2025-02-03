import { inject } from '@adonisjs/core';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessService from '#social-class/domain/service/social_class_happiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyHappinessService from '#political-party/domain/service/political_party_happiness_service';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';

@inject()
export default class TurnHappinessService implements TurnProcessorStep {
  constructor(
    private readonly socialClassHappinessService: SocialClassHappinessService,
    private readonly politicalPartyHappinessService: PoliticalPartyHappinessService,
  ) {
  }

  public async execute(turnDataContext: TurnDataContext): Promise<void> {
    this.socialClassHappinessService.updateSocialClassesHappiness(turnDataContext.socialClasses);
    this.politicalPartyHappinessService.updatePoliticalPartiesHappiness(turnDataContext.politicalParties, turnDataContext.socialClassesPerType);
  }
}
