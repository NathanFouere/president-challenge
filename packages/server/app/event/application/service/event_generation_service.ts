import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
import type Game from '#game/domain/models/game';
import type Election from '#election/domain/model/election';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
import { ElectionType } from '#election/domain/model/election_type';
import { EventDefinitionsConstants } from '#event/application/queries/event_definitions_constants';

@inject()
export default class EventGenerationService {
  constructor(
    private readonly eventFactory: EventFactory,
    private readonly eventRepository: IEventRepository,
    private readonly getEventDefinitionByIdentifierQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
  ) {
  }

  public async generateEventFromElection(game: Game, election: Election): Promise<void> {
    const eventDefinitionIdentifier = this.getEventDefinitionIdentifierFromElectionType(election.type);
    const eventDefinition = await this.getEventDefinitionByIdentifierQueryHandler.handle(
      new GetEventDefinitionByIdentifierQuery(eventDefinitionIdentifier),
    );

    const event = this.eventFactory.createEventFromElection(eventDefinition.id, game.id, game.turn, election.id);
    await this.eventRepository.save(event);
  }

  private getEventDefinitionIdentifierFromElectionType(electionType: ElectionType): EventDefinitionsConstants {
    switch (electionType) {
      case ElectionType.PRESIDENTIAL:
        return EventDefinitionsConstants.PRESIDENTIAL_ELECTION;
      case ElectionType.PARLIAMENTARY:
        return EventDefinitionsConstants.PARLIAMENTARY_ELECTION;
      case ElectionType.SENATORIAL:
        return EventDefinitionsConstants.SENATORIAL_ELECTION;
      default:
        throw new Error('Unknown election type');
    }
  }
}
