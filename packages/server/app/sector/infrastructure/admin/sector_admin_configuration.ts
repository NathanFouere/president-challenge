import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import Sector from '#sector/domain/model/sector';
import SectorDefinition from '#sector/domain/model/sector_definition';

export const createSectorDefinitionAdminResource = () => (
  {
    resource: new LucidResource(SectorDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          sectors: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'sectors',
            },
          },
        },
      }),
    ],
  }
);

export const createSectorAdminResource = () => ({
  resource: new LucidResource(Sector, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
