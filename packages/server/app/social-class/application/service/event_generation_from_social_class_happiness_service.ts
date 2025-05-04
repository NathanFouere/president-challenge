import { inject } from '@adonisjs/core';

import { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
import type { SocialClassesPerType } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassesAverageHappinessCalculatorService
  from '#social-class/domain/service/social_classes_average_happiness_calculator_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_and_game_definition_query_handler';
import { GetEventDefinitionByIdentifierAndGameDefinitionQuery } from '#event/application/queries/get_event_definition_by_identifier_and_game_definition_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';
import { EventDefinitionsConstants } from '#event/application/queries/event_definitions_constants';
import type EventDefinition from '#event/domain/models/event_definition';
import { HappinessLevel } from '#social-class/domain/models/happiness_level';
import type Game from '#game/domain/models/game';

@inject()
export default class EventGenerationFromSocialClassHappinessService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly socialClassesAverageHappinessCalculatorService: SocialClassesAverageHappinessCalculatorService,
    private readonly getEventByIdentifierAndGameQueryHandler: IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler,
    private readonly eventFactory: EventFactory,
  ) {
  }

  public async generateEventsFromSocialClassHappiness(socialClassesPerType: SocialClassesPerType, game: Game): Promise<void> {
    const businessOwnerAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClassesPerType.businessOwner);
    const workingClassAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClassesPerType.workingClass);
    const middleClassAverageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClassesPerType.middleClass);

    if (businessOwnerAverageHappiness <= HappinessLevel.UNHAPPY) {
      await this.generateSocialClassTypeEventFromunHappiness(SocialClassTypes.BUSINESS_OWNER, game);
    }

    if (workingClassAverageHappiness <= HappinessLevel.UNHAPPY) {
      await this.generateSocialClassTypeEventFromunHappiness(SocialClassTypes.MIDDLE_CLASS, game);
    }

    if (middleClassAverageHappiness <= HappinessLevel.UNHAPPY) {
      await this.generateSocialClassTypeEventFromunHappiness(SocialClassTypes.WORKING_CLASS, game);
    }
  }

  private async generateSocialClassTypeEventFromunHappiness(socialClassType: SocialClassTypes, game: Game): Promise<void> {
    const eventDefinitionIdentifier: EventDefinitionsConstants = this.getEventDefinitionIdentifierFromSocialClassType(socialClassType);
    const eventDefinition: EventDefinition = await this.getEventByIdentifierAndGameQueryHandler.handle(new GetEventDefinitionByIdentifierAndGameDefinitionQuery(
      eventDefinitionIdentifier,
      game.definition.identifier,
    ));
    const event = this.eventFactory.createEventForGameAtTurn(eventDefinition.id, game.id, game.turn);

    await this.eventRepository.save(event);
  }

  private getEventDefinitionIdentifierFromSocialClassType(socialClassType: SocialClassTypes): EventDefinitionsConstants {
    switch (socialClassType) {
      case SocialClassTypes.BUSINESS_OWNER:
        return EventDefinitionsConstants.UNHAPPINESS_BUSINESS_OWNER;
      case SocialClassTypes.MIDDLE_CLASS:
        return EventDefinitionsConstants.UNHAPPINESS_WORKING_CLASS;
      case SocialClassTypes.WORKING_CLASS:
        return EventDefinitionsConstants.UNHAPPINESS_MIDDLE_CLASS;
      default:
        throw new Error('Unknown social class type');
    }
  }
}
