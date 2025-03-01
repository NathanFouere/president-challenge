import { inject } from '@adonisjs/core';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessService from '#social-class/domain/service/social_class_happiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyHappinessService from '#political-party/domain/service/political_party_happiness_service';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventGenerationFromSocialClassHappinessService
  from '#social-class/application/service/event_generation_from_social_class_happiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventGenerationFromPoliticalPartyHappinessService
  from '#political-party/application/service/event_generation_from_political_party_happiness_service';

@inject()
export default class TurnHappinessService implements TurnProcessorStep {
  constructor(
    private readonly socialClassHappinessService: SocialClassHappinessService,
    private readonly politicalPartyHappinessService: PoliticalPartyHappinessService,
    private readonly eventGenerationFromSocialClassHappinessService: EventGenerationFromSocialClassHappinessService,
    private readonly eventGenerationFromPoliticalPartyHappinessService: EventGenerationFromPoliticalPartyHappinessService,
  ) {
  }

  public async execute(turnDataContext: TurnDataContext): Promise<void> {
    await Promise.all([
      this.handleSocialClassHappiness(turnDataContext),
      this.handlePoliticalPartyHappiness(turnDataContext),
    ]);
  }

  private async handleSocialClassHappiness(turnDataContext: TurnDataContext): Promise<void> {
    this.socialClassHappinessService.updateSocialClassesHappiness(turnDataContext.socialClasses);
    await this.eventGenerationFromSocialClassHappinessService.generateEventsFromSocialClassHappiness(
      turnDataContext.socialClassesPerType,
      turnDataContext.game.id,
      turnDataContext.game.turn,
    );
  }

  private async handlePoliticalPartyHappiness(turnDataContext: TurnDataContext): Promise<void> {
    this.politicalPartyHappinessService.updatePoliticalPartiesHappiness(turnDataContext.politicalParties, turnDataContext.socialClassesPerType);
    await this.eventGenerationFromPoliticalPartyHappinessService.generateEventsFromPoliticalPartyHappiness(
      turnDataContext.politicalParties,
      turnDataContext.game.id,
      turnDataContext.game.turn,
    );
  }
}
