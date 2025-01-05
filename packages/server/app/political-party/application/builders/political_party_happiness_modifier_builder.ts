import { HappinessModifierBuilder } from '#happiness-modifier/application/builder/happiness_modifier_builder';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';

export default class PoliticalPartyHappinessModifierBuilder extends HappinessModifierBuilder {
  private politicalPartyId: number | null = null;

  public withPoliticalPartyId(politicalPartyId: number): this {
    this.politicalPartyId = politicalPartyId;
    return this;
  }

  public build(): PoliticalPartyHappinessModifier {
    const happinessModifier = new PoliticalPartyHappinessModifier();
    if (this.name) happinessModifier.name = this.name;
    else throw new Error('Name is required');
    if (this.description) happinessModifier.description = this.description;
    else throw new Error('Description is required');
    if (this.color) happinessModifier.color = this.color;
    else throw new Error('Color is required');
    if (this.type) happinessModifier.type = this.type;
    else throw new Error('Type is required');
    if (this.duration) happinessModifier.duration = this.duration;
    if (this.politicalPartyId) happinessModifier.politicalPartyId = this.politicalPartyId;
    else throw new Error('Social class id is required');
    return happinessModifier;
  }
}

export function aPoliticalPartyHappinessModifier(): PoliticalPartyHappinessModifierBuilder {
  return new PoliticalPartyHappinessModifierBuilder();
}
