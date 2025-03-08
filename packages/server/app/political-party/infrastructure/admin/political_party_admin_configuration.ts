import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import PoliticalParty from '#political-party/domain/models/political_party';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';
import PoliticalAffiliationChoiceHappinessEffect
  from '#political-party/domain/models/political_affiliation_choice_happiness_effect';
import PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';

export const createPoliticalPartyDefinitionAdminResource = () => (
  {
    resource: new LucidResource(PoliticalPartyDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          politicalParties: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'political_parties',
            },
          },
        },
      }),
    ],
  }
);

export const createPoliticalPartyAdminResource = () => ({
  resource: new LucidResource(PoliticalParty, 'postgres'),
  features: [targetRelationSettingsFeature()],
});

export const createPoliticalAffiliationChoiceHappinessEffectAdminResource = () => ({
  resource: new LucidResource(PoliticalAffiliationChoiceHappinessEffect, 'postgres'),
  features: [targetRelationSettingsFeature()],
});

export const createPoliticalAffiliationLawHappinessEffectAdminResource = () => ({
  resource: new LucidResource(PoliticalAffiliationLawHappinessEffect, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
