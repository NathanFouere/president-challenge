import {
  aPoliticalPartyHappinessModifier,
} from '#political-party/application/builders/political_party_happiness_modifier_builder';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';
import type PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import type Law from '#law/domain/model/law';

export default class PoliticalPartyHappinessModifierFactory {
  readonly taxHappinessModifierColor = 'red';

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
}
