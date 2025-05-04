import {
  IGetChoiceByIdAndEventQueryHandler,
} from '#event/application/queries/i_get_choice_by_id_and_event_query_handler';
import AppProvider from '#common/provider';
import IGetEventByIdAndGameQueryHandler from '#event/application/queries/i_get_event_by_id_and_game_query_handler';
import {
  IGetDisplayableEventsOfTurnQueryHandler,
} from '#event/application/queries/i_get_displayable_events_of_turn_query_handler';
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
import IEventRepository from '#event/domain/repository/i_event_repository';
import IChoiceRepository from '#event/domain/repository/i_choice_repository';
import IEventDefinitionRepository from '#event/domain/repository/i_event_definition_repository';
import IChoiceDefinitionRepository from '#event/domain/repository/i_choice_definition_repository';
import IGetEventDefinitionsByGameDefinitionQueryHandler
  from '#event/application/queries/i_get_event_definitions_by_game_definition_query_handler';
import IGetChoiceDefinitionsByGameDefinitionQueryHandler
  from '#event/application/queries/i_get_choice_definitions_by_game_definition_query_handler';

export default class EventProvider extends AppProvider {
  public async boot() {
    const { default: GetChoiceByIdAndEventQueryHandler } = await import(
      '#event/infrastructure/queries/get_choice_by_id_and_event_query_handler'
    );
    const { default: GetEventByIdAndGameQueryHandler } = await import(
      '#event/infrastructure/queries/get_event_by_id_and_game_query_handler'
    );
    const { default: GetEventDefinitionByGameQueryHandler } = await import(
      '#event/infrastructure/queries/get_event_definition_by_identifier_query_handler'
    );
    const { default: GetDisplayableEventsOfTurnQueryHandler } = await import(
      '#event/infrastructure/queries/get_displayable_events_of_turn_query_handler'
    );
    const { default: EventRepository } = await import(
      '#event/infrastructure/repositories/event_repository'
    );
    const { default: ChoiceRepository } = await import(
      '#event/infrastructure/repositories/choice_repository'
    );
    const { default: EventDefinitionRepository } = await import(
      '#event/infrastructure/repositories/event_definition_repository'
    );
    const { default: ChoiceDefinitionRepository } = await import(
      '#event/infrastructure/repositories/choice_definition_repository'
    );
    const { default: EventDefinitionQueryHandler } = await import(
      '#event/infrastructure/queries/get_event_definitions_by_game_definition_query_handler'
    );

    const { default: GetChoiceDefinitionsByGameDefinitionQueryHandler } = await import(
      '#event/infrastructure/queries/get_choice_definitions_by_game_definition_query_handler'
    );

    this.app.container.bind(IGetChoiceDefinitionsByGameDefinitionQueryHandler, () => {
      return new GetChoiceDefinitionsByGameDefinitionQueryHandler();
    });

    this.app.container.bind(IGetEventDefinitionsByGameDefinitionQueryHandler, () => {
      return new EventDefinitionQueryHandler();
    });

    this.app.container.bind(IChoiceDefinitionRepository, () => {
      return new ChoiceDefinitionRepository();
    });

    this.app.container.bind(IEventDefinitionRepository, () => {
      return new EventDefinitionRepository();
    });

    this.app.container.bind(IGetChoiceByIdAndEventQueryHandler, () => {
      return new GetChoiceByIdAndEventQueryHandler();
    });

    this.app.container.bind(IGetEventByIdAndGameQueryHandler, () => {
      return new GetEventByIdAndGameQueryHandler();
    });

    this.app.container.bind(IGetEventDefinitionByIdentifierQueryHandler, () => {
      return new GetEventDefinitionByGameQueryHandler();
    });

    this.app.container.bind(IGetDisplayableEventsOfTurnQueryHandler, () => {
      return new GetDisplayableEventsOfTurnQueryHandler();
    });

    this.app.container.bind(IEventRepository, () => {
      return new EventRepository();
    });

    this.app.container.bind(IChoiceRepository, () => {
      return new ChoiceRepository();
    });
  }
}
