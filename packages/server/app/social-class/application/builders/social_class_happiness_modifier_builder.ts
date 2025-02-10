import { HappinessModifierBuilder } from '#happiness-modifier/application/builder/happiness_modifier_builder';
import SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';

export default class SocialClassHappinessModifierBuilder extends HappinessModifierBuilder {
  private socialClassId: number | null = null;

  public withSocialClassId(socialClassId: number): this {
    this.socialClassId = socialClassId;
    return this;
  }

  public build(): SocialClassHappinessModifier {
    const happinessModifier = new SocialClassHappinessModifier();
    if (this.name) happinessModifier.name = this.name;
    else throw new Error('Name is required');
    if (this.description) happinessModifier.description = this.description;
    else throw new Error('Description is required');
    if (this.color) happinessModifier.color = this.color;
    else throw new Error('Color is required');
    if (this.type) happinessModifier.type = this.type;
    else throw new Error('Type is required');
    if (this.duration) happinessModifier.duration = this.duration;
    if (this.amount !== null) happinessModifier.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.socialClassId) happinessModifier.socialClassId = this.socialClassId;
    else throw new Error('Social class id is required');
    if (this.lawOriginId) happinessModifier.lawOriginId = this.lawOriginId;
    return happinessModifier;
  }
}

export function aSocialClassHappinessModifier(): SocialClassHappinessModifierBuilder {
  return new SocialClassHappinessModifierBuilder();
}
