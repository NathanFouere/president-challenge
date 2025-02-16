import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import Tax from '#tax/domain/model/tax';
import TaxDefinition from '#tax/domain/model/tax_definition';

export const createTaxDefinitionAdminResource = () => (
  {
    resource: new LucidResource(TaxDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          taxes: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'taxes',
            },
          },
        },
      }),
    ],
  }
);

export const createTaxAdminResource = () => ({
  resource: new LucidResource(Tax, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
