import { targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';

export const createSocialClassHappinessModifierAdminResource = () => (
  {
    resource: new LucidResource(SocialClassHappinessModifier, 'postgres'),
    features: [targetRelationSettingsFeature()],
  }
);

export const createPoliticalPartyHappinessModifierAdminResource = () => ({
  resource: new LucidResource(PoliticalPartyHappinessModifier, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
