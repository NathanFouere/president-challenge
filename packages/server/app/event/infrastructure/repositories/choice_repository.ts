import Choice from '#event/domain/models/choice';

export class ChoiceRepository {
  public async save(choice: Choice): Promise<void> {
    await choice.save();
  }

  public async findById(choiceId: number): Promise<Choice | null> {
    return Choice.find(choiceId);
  }

  public async getById(choiceId: number): Promise<Choice> {
    const choice = await Choice.findOneOrFail(choiceId);
    return choice;
  }

  public async delete(choice: Choice): Promise<void> {
    await choice.delete();
  }
}
