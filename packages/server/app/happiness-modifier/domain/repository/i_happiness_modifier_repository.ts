import type HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';

export default abstract class IHappinessModifierRepository {
  abstract delete(happinessModifier: HappinessModifier): Promise<void>;
  abstract deleteMany(happinessModifiers: HappinessModifier[]): Promise<void>;
  abstract save(happinessModifier: HappinessModifier): Promise<void>;
  abstract saveMany(happinessModifiers: HappinessModifier[]): Promise<void>;
}
