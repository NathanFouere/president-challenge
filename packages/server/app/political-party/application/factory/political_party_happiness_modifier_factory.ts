import {
  aPoliticalPartyHappinessModifier,
} from '#political-party/application/builders/political_party_happiness_modifier_builder';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';
import type PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import type Law from '#law/domain/model/law';
import type PoliticalAffiliationChoiceHappinessEffect
  from '#political-party/domain/models/political_affiliation_choice_happiness_effect';
import type ChoiceDefinition from '#event/domain/models/choice_definition';

export default class PoliticalPartyHappinessModifierFactory {
  // TODO => colors should be places in the dto factory
  readonly taxHappinessModifierColor = 'red';
  readonly choiceHappinessModifierColor = 'blue';

  public createFromLaw(law: Law, politicalAffiliationLawHappinessEffect: PoliticalAffiliationLawHappinessEffect, politicalParty: PoliticalParty): PoliticalPartyHappinessModifier {
    return aPoliticalPartyHappinessModifier()
      .withDuration(politicalAffiliationLawHappinessEffect.duration)
      .withAmount(politicalAffiliationLawHappinessEffect.happinessModifier)
      .withPoliticalPartyId(politicalParty.id)
      .withType(politicalAffiliationLawHappinessEffect.type)
      .withDescription(law.definition.name)
      .withColor(this.taxHappinessModifierColor)
      .withName(law.definition.name)
      .withLawOriginId(law.id)
      .build();
  }

  public createFromChoice(choiceDefinition: ChoiceDefinition, politicalAffiliationChoiceHappinessEffect: PoliticalAffiliationChoiceHappinessEffect, politicalParty: PoliticalParty): PoliticalPartyHappinessModifier {
    return aPoliticalPartyHappinessModifier()
      .withDuration(politicalAffiliationChoiceHappinessEffect.duration)
      .withAmount(politicalAffiliationChoiceHappinessEffect.happinessModifier)
      .withPoliticalPartyId(politicalParty.id)
      .withType(politicalAffiliationChoiceHappinessEffect.type)
      .withDescription(choiceDefinition.text)
      .withColor(this.choiceHappinessModifierColor)
      .withName(choiceDefinition.text)
      .build();
  }
}
