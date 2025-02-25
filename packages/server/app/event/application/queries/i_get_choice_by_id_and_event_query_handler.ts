import type Choice from '#event/domain/models/choice';
import type { GetChoiceByIdAndEventQuery } from '#event/application/queries/get_choice_by_id_and_event_query';

export abstract class IGetChoiceByIdAndEventQueryHandler {
  abstract handleForChoose(query: GetChoiceByIdAndEventQuery): Promise<Choice>;
}
