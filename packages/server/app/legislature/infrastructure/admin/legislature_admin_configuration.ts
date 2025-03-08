import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import Law from '#law/domain/model/law';
import LawDefinition from '#law/domain/model/law_definition';
import ParliamentDefinition from '#legislature/domain/models/parliament_definition';
import { Parliament } from '#legislature/domain/models/parliament';
import Senate from '#legislature/domain/models/senate';
import SenateDefinition from '#legislature/domain/models/senate_definition';

export const createLawDefinitionAdminResource = () => (
  {
    resource: new LucidResource(LawDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          laws: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'laws',
            },
          },
        },
      }),
    ],
  }
);

export const createLawAdminResource = () => ({
  resource: new LucidResource(Law, 'postgres'),
  features: [targetRelationSettingsFeature()],
});

export const createParliamentDefinitionAdminResource = () => (
  {
    resource: new LucidResource(ParliamentDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          parliaments: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'parliaments',
            },
          },
        },
      }),
    ],
  }
);

export const createParliamentAdminResource = () => ({
  resource: new LucidResource(Parliament, 'postgres'),
  features: [targetRelationSettingsFeature()],
});

export const createSenateDefinitionAdminResource = () => (
  {
    resource: new LucidResource(SenateDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          senates: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'senates',
            },
          },
        },
      }),
    ],
  }
);

export const createSenateAdminResource = () => ({
  resource: new LucidResource(Senate, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
