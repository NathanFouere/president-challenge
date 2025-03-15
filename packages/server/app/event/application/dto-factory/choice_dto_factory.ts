import type { ChoiceDto } from '@president-challenge/shared/dist/event/choice-dto.js';
import type Choice from '#event/domain/models/choice';

export class ChoiceDtoFactory {
  public createFromChoice(choice: Choice): ChoiceDto {
    return {
      id: choice.id,
      text: choice.definition.text,
      status: choice.status,
    };
  }

  public createFromChoices(choices: Choice[]): ChoiceDto[] {
    return choices.map(choice => this.createFromChoice(choice));
  }
}
