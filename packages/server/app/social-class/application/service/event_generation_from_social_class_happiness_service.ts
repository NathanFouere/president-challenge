import { inject } from '@adonisjs/core';

import { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
import type { SocialClassesPerType } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassesAverageHappinessCalculatorService
  from '#social-class/domain/service/social_classes_average_happiness_calculator_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';

@inject()
export default class EventGenerationFromSocialClassHappinessService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly socialClassesAverageHappinessCalculatorService: SocialClassesAverageHappinessCalculatorService,
    private readonly getEventByIdentifierAndGameQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
    private readonly eventFactory: EventFactory,
  ) {
  }

  public async generateEventsFromSocialClassHappiness(socialClassesPerType: SocialClassesPerType, gameId: number, turn: number): Promise<void> {
    const capitalistsAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClassesPerType.capitalist);
    const proletariatAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClassesPerType.proletariat);
    const petiteBourgeoisieAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClassesPerType.petiteBourgeoisie);

    if (capitalistsAverageHappiness <= 1) {
      await this.generateSocialClassTypeEventFromLawHappiness(SocialClassTypes.CAPITALIST, gameId, turn);
    }

    if (proletariatAverageHappiness <= 1) {
      await this.generateSocialClassTypeEventFromLawHappiness(SocialClassTypes.PROLETARIAT, gameId, turn);
    }

    if (petiteBourgeoisieAverageHappiness <= 1) {
      await this.generateSocialClassTypeEventFromLawHappiness(SocialClassTypes.PETIT_BOURGEOIS, gameId, turn);
    }
  }

  private async generateSocialClassTypeEventFromLawHappiness(socialClassType: SocialClassTypes, gameId: number, turn: number): Promise<void> {
    const eventDefinitionIdentifier = `unhappiness-${socialClassType}`;
    const eventDefinition = await this.getEventByIdentifierAndGameQueryHandler.handle(new GetEventDefinitionByIdentifierQuery(
      eventDefinitionIdentifier,
    ));
    const event = this.eventFactory.createEventForGameAtTurn(eventDefinition.id, gameId, turn);

    await this.eventRepository.save(event);
  }
}
