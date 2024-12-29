import type { GetChoiceByIdAndEventQuery } from '#event/application/queries/get_choice_by_id_and_event_query';
import Choice from '#event/domain/models/choice';
import type {
  IGetChoiceByIdAndEventQueryHandler,
} from '#event/application/queries/i_get_choice_by_id_and_event_query_handler';

export default class GetChoiceByIdAndEventQueryHandler implements IGetChoiceByIdAndEventQueryHandler {
  public async handle(query: GetChoiceByIdAndEventQuery): Promise<Choice> {
    const choice = await Choice
      .query()
      .where('id', query.choiceId)
      .where('event_id', query.eventId)
      .preload('event', (eventQuery) => {
        eventQuery.preload('choices');
      })
      .firstOrFail();

    if (choice.triggerEventId) {
      await choice.load('triggerEvent');
    }

    return choice;
  }
}
