import type { GetChoiceByIdAndEventQuery } from '#event/application/queries/get_choice_by_id_and_event_query';
import Choice from '#event/domain/models/choice';

export default class GetChoiceByIdAndEventQueryHandler {
  public async handle(query: GetChoiceByIdAndEventQuery): Promise<Choice> {
    const choice = await Choice
      .query()
      .where('id', query.choiceId)
      .where('event_id', query.eventId)
      .preload('event', (eventQuery) => {
        eventQuery.preload('choices');
      })
      .first();

    if (null === choice) {
      throw new Error('Choice not found');
    }

    if (choice.triggerEventId) {
      await choice.load('triggerEvent');
    }

    return choice;
  }
}
