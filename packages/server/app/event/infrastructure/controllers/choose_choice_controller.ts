import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChooseChoiceService } from '#event/application/services/choose_choice_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChoiceRepository } from '#event/infrastructure/repositories/choice_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GetChoiceByIdAndEventQueryHandler from '#event/application/queries/get_choice_by_id_and_event_query_handler';
import { GetChoiceByIdAndEventQuery } from '#event/application/queries/get_choice_by_id_and_event_query';

@inject()
export default class ChooseChoiceController {
  constructor(
    private readonly chooseChoiceService: ChooseChoiceService,
    private readonly choiceRepository: ChoiceRepository,
    private readonly getChoiceByIdAndEventQueryHandler: GetChoiceByIdAndEventQueryHandler,
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
