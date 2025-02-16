import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import Law from '#law/domain/model/law';
import LawDefinition from '#law/domain/model/law_definition';

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
