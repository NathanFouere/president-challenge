import type HappinessModifierDto from '@shared/dist/common/happiness-modifier-dto.js';
import type HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';

export default class HappinessDtoFactory {
  public createFromHappinesssModifier(happinessModifier: HappinessModifier): HappinessModifierDto {
    return {
      id: happinessModifier.id,
      name: happinessModifier.name,
      description: happinessModifier.description,
      color: happinessModifier.color,
      type: happinessModifier.type,
      duration: happinessModifier.duration,
    };
  }

  public createFromHappinesssModifiers(happinessModifiers: HappinessModifier[]): HappinessModifierDto[] {
    return happinessModifiers.map(happinessModifier => this.createFromHappinesssModifier(happinessModifier));
  }
}
