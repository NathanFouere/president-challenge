import Choice from '#event/domain/models/choice';
import type IChoiceRepository from '#event/domain/repository/i_choice_repository';

export default class ChoiceRepository implements IChoiceRepository {
  public async save(choice: Choice): Promise<void> {
    await choice.save();
  }

  public async findById(choiceId: number): Promise<Choice | null> {
    return Choice.find(choiceId);
  }

  public async delete(choice: Choice): Promise<void> {
    await choice.delete();
  }

  public async saveMany(choices: Choice[]): Promise<void> {
    const savePromises = [];
    for (const choice of choices) {
      savePromises.push(choice.save());
    }
    await Promise.all(savePromises);
  }
}
