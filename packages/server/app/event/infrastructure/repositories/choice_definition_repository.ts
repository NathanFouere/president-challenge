import type IChoiceDefinitionRepository from '#event/domain/repository/i_choice_definition_repository';
import ChoiceDefinition from '#event/domain/models/choice_definition';

export default class ChoiceDefinitionRepository implements IChoiceDefinitionRepository {
  public async save(choice: ChoiceDefinition): Promise<void> {
    await choice.save();
  }

  public async findById(choiceId: number): Promise<ChoiceDefinition | null> {
    return ChoiceDefinition.find(choiceId);
  }

  public async delete(choice: ChoiceDefinition): Promise<void> {
    await choice.delete();
  }

  public async saveMany(choices: ChoiceDefinition[]): Promise<void> {
    const savePromises = [];
    for (const choice of choices) {
      savePromises.push(choice.save());
    }
    await Promise.all(savePromises);
  }

  public async getAll(): Promise<ChoiceDefinition[]> {
    return ChoiceDefinition.all();
  }
}
