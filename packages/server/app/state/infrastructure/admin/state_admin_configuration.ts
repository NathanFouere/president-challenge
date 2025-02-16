import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import State from '#state/domain/model/state';
import StateDefinition from '#state/domain/model/state_definition';

export const createStateDefinitionAdminResource = () => (
  {
    resource: new LucidResource(StateDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          states: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'states',
            },
          },
        },
      }),
    ],
  }
);

export const createStateAdminResource = () => ({
  resource: new LucidResource(State, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
