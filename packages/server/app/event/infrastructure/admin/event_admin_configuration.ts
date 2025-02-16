import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import EventDefinition from '#event/domain/models/event_definition';
import Event from '#event/domain/models/event';

export const createEventDefinitionAdminResource = () => (
  {
    resource: new LucidResource(EventDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          events: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'events',
            },
          },
        },
      }),
    ],
  }
);

export const createEventAdminResource = () => ({
  resource: new LucidResource(Event, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
