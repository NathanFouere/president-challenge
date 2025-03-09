import { inject } from '@adonisjs/core';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import DefeatSocialClassUnhappinessService
  from '#game/application/service/defeat/defeat_social_class_unhappiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import DefeatPoliticalPartyUnhappinessService
  from '#game/application/service/defeat/defeat_political_party_unhappiness_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import DefeatPresidentialElectionService from '#game/application/service/defeat/defeat_presidential_election_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameDefeatEventGenerationService from '#game/application/service/defeat/game_defeat_event_generation_service';

@inject()
export default class GameDefeatService implements TurnProcessorStep {
  constructor(
    private readonly defeatSocialClassUnhappinessService: DefeatSocialClassUnhappinessService,
    private readonly defeatPoliticalPartyUnhappinessService: DefeatPoliticalPartyUnhappinessService,
    private readonly defeatPresidentialElectionService: DefeatPresidentialElectionService,
    private readonly gameDefeatEventGenerationService: GameDefeatEventGenerationService,
  ) {
  }

  public async execute(context: TurnDataContext): Promise<void> {
    const defeatFromLosingPresidentialElection = await this.defeatPresidentialElectionService.checkDefeatPresidentialElection(context.game.id, context.game.turn);
    if (defeatFromLosingPresidentialElection) {
      context.game.setDefeatFromLosePresidentialElection();
      await this.gameDefeatEventGenerationService.createEventFromDefeat(context.game);
      return;
    }

    const defeatFromSocialClassUnhappiness = await this.defeatSocialClassUnhappinessService.checkDefeatSocialClassUnhappiness(context.socialClasses);
    if (defeatFromSocialClassUnhappiness) {
      context.game.setDefeatFromPopularUprising();
      await this.gameDefeatEventGenerationService.createEventFromDefeat(context.game);
      return;
    }

    const defeatFromPoliticalPartyUnhappiness = await this.defeatPoliticalPartyUnhappinessService.checkDefeatPoliticalPartyUnhappiness(context.politicalParties);
    if (defeatFromPoliticalPartyUnhappiness) {
      context.game.setDefeatFromRevolution();
      await this.gameDefeatEventGenerationService.createEventFromDefeat(context.game);
      return;
    }
  }
}
