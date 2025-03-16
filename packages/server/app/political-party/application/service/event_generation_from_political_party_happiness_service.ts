import { inject } from '@adonisjs/core';

import { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';
import type PoliticalParty from '#political-party/domain/models/political_party';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
import { EventDefinitionsConstants } from '#event/application/queries/event_definitions_constants';

@inject()
export default class EventGenerationFromPoliticalPartyHappinessService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly getEventByIdentifierAndGameQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
    private readonly eventFactory: EventFactory,
  ) {
  }

  public async generateEventsFromPoliticalPartyHappiness(politicalParties: PoliticalParty[], gameId: number, turn: number): Promise<void> {
    for (const politicalParty of politicalParties) {
      const politicalPartyHappiness = politicalParty.getHappinessLevel();
      if (politicalPartyHappiness <= 1) {
        await this.generatePoliticalPartyEventFromLawHappiness(politicalParty, gameId, turn);
      }
    }
  }

  private async generatePoliticalPartyEventFromLawHappiness(politicalParty: PoliticalParty, gameId: number, turn: number): Promise<void> {
    const eventDefinitionIdentifier = this.getEventDefinitionIdentifierFromPoliticalAffiliation(politicalParty.definition.affiliation);
    const eventDefinition = await this.getEventByIdentifierAndGameQueryHandler.handle(new GetEventDefinitionByIdentifierQuery(
      eventDefinitionIdentifier,
    ));
    const event = this.eventFactory.createEventForGameAtTurn(eventDefinition.id, gameId, turn);

    await this.eventRepository.save(event);
  }

  private getEventDefinitionIdentifierFromPoliticalAffiliation(affiliation: PoliticalAffiliation): EventDefinitionsConstants {
    switch (affiliation) {
      case PoliticalAffiliation.FarLeft:
        return EventDefinitionsConstants.UNHAPPINESS_FAR_LEFT;
      case PoliticalAffiliation.Left:
        return EventDefinitionsConstants.UNHAPPINESS_LEFT;
      case PoliticalAffiliation.CenterLeft:
        return EventDefinitionsConstants.UNHAPPINESS_CENTER_LEFT;
      case PoliticalAffiliation.CenterRight:
        return EventDefinitionsConstants.UNHAPPINESS_CENTER_RIGHT;
      case PoliticalAffiliation.Right:
        return EventDefinitionsConstants.UNHAPPINESS_RIGHT;
      case PoliticalAffiliation.FarRight:
        return EventDefinitionsConstants.UNHAPPINESS_FAR_RIGHT;
    }
  }
}
