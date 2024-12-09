import * as console from 'node:console';
import type { GetChoiceByIdAndEventQuery } from '#event/application/queries/get_choice_by_id_and_event_query';
import Choice from '#event/domain/models/choice';

export default class GetChoiceByIdAndEventQueryHandler {
  public async handle(query: GetChoiceByIdAndEventQuery): Promise<Choice> {
    console.log(query);
    const choice = Choice
      .query()
      .where('id', query.choiceId)
      .where('event_id', query.eventId)
      .first();

    if (null === choice) {
      throw new Error('Choice not found');
    }

    return choice;
  }
}
