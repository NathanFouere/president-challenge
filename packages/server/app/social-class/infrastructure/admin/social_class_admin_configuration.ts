import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import SocialClass from '#social-class/domain/models/social_class';
import SocialClassDefinition from '#social-class/domain/models/social_class_definition';
import SocialClassTypeChoiceHappinessEffect from '#social-class/domain/models/social_class_type_choice_happiness_effect';
import SocialClassTypeLawHappinessEffect from '#social-class/domain/models/social_class_type_law_happiness_effect';

export const createSocialClassDefinitionAdminResource = () => (
  {
    resource: new LucidResource(SocialClassDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          socialClasses: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'social_classes',
            },
          },
        },
      }),
    ],
  }
);

export const createSocialClassAdminResource = () => ({
  resource: new LucidResource(SocialClass, 'postgres'),
  features: [targetRelationSettingsFeature()],
});

export const createSocialClassChoiceHappinessEffectAdminResource = () => ({
  resource: new LucidResource(SocialClassTypeChoiceHappinessEffect, 'postgres'),
  features: [targetRelationSettingsFeature()],
});

export const createSocialClassLawHappinessEffectAdminResource = () => ({
  resource: new LucidResource(SocialClassTypeLawHappinessEffect, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
