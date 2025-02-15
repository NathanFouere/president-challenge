import type ChoiceDefinition from '#event/domain/models/choice_definition';

export default abstract class IChoiceDefinitionRepository {
  public abstract save(choice: ChoiceDefinition): Promise<void>;
  public abstract findById(choiceId: number): Promise<ChoiceDefinition | null>;
  public abstract delete(choice: ChoiceDefinition): Promise<void>;
  public abstract saveMany(choices: ChoiceDefinition[]): Promise<void>;
  public abstract getAll(): Promise<ChoiceDefinition[]>;
}
