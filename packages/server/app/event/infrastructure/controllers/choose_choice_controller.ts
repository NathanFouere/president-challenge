import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChooseChoiceService } from '#event/domain/services/choose_choice_service';

import { GetChoiceByIdAndEventQuery } from '#event/application/queries/get_choice_by_id_and_event_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetChoiceByIdAndEventQueryHandler,
} from '#event/application/queries/i_get_choice_by_id_and_event_query_handler';

@inject()
export default class ChooseChoiceController {
  constructor(
    private readonly chooseChoiceService: ChooseChoiceService,
    private readonly getChoiceByIdAndEventQueryHandler: IGetChoiceByIdAndEventQueryHandler,
  ) {
  }

  public async chooseChoice({ auth, response, params }: HttpContext) {
    try {
      auth.getUserOrFail();
      const choiceId: number = params.choiceId;
      const eventId: number = params.eventId;

      const choice = await this.getChoiceByIdAndEventQueryHandler.handle(new GetChoiceByIdAndEventQuery(
        choiceId,
        eventId,
      ));

      await this.chooseChoiceService.chooseChoice(choice);

      return choice;
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
  }
}
