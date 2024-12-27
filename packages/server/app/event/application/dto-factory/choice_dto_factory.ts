import type { ChoiceDto } from '@shared/dist/event/choice-dto.js';
import type Choice from '#event/domain/models/choice';

export class ChoiceDtoFactory {
  public createFromChoice(choice: Choice): ChoiceDto {
    return {
      id: choice.id,
      text: choice.text,
      status: choice.status,
    };
  }

  public createFromChoices(choices: Choice[]): ChoiceDto[] {
    return choices.map(choice => this.createFromChoice(choice));
  }
}
