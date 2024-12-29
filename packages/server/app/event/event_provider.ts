import {
  IGetChoiceByIdAndEventQueryHandler,
} from '#event/application/queries/i_get_choice_by_id_and_event_query_handler';
import AppProvider from '#common/provider';
import IGetEventByIdAndGameQueryHandler from '#event/application/queries/i_get_event_by_id_and_game_query_handler';
import {
  IGetDisplayableEventsOfTurnQueryHandler,
} from '#event/application/queries/i_get_displayable_events_of_turn_query_handler';
import IGetEventByIdentifierAndGameQueryHandler
  from '#event/application/queries/i_get_event_by_identifier_and_game_query_handler';
import IEventRepository from '#event/domain/repository/i_event_repository';
import IChoiceRepository from '#event/domain/repository/i_choice_repository';

export default class EventProvider extends AppProvider {
  public async boot() {
    const { default: GetChoiceByIdAndEventQueryHandler } = await import(
      '#event/infrastructure/queries/get_choice_by_id_and_event_query_handler'
    );
    const { default: GetEventByIdAndGameQueryHandler } = await import(
      '#event/infrastructure/queries/get_event_by_id_and_game_query_handler'
    );
    const { default: GetEventByIdentifierAndGameQueryHandler } = await import(
      '#event/infrastructure/queries/get_event_by_identifier_and_game_query_handler'
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

    this.app.container.bind(IGetChoiceByIdAndEventQueryHandler, () => {
      return new GetChoiceByIdAndEventQueryHandler();
    });
    this.app.container.bind(IGetEventByIdAndGameQueryHandler, () => {
      return new GetEventByIdAndGameQueryHandler();
    });
    this.app.container.bind(IGetEventByIdentifierAndGameQueryHandler, () => {
      return new GetEventByIdentifierAndGameQueryHandler();
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
