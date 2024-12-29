import type Choice from '#event/domain/models/choice';

export default abstract class IChoiceRepository {
  public abstract save(choice: Choice): Promise<void>;
  public abstract findById(choiceId: number): Promise<Choice | null>;
  public abstract delete(choice: Choice): Promise<void>;
  public abstract saveMany(choices: Choice[]): Promise<void>;
}
