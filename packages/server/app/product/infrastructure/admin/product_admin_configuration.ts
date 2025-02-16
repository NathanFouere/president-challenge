import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import Product from '#product/domain/models/product';
import ProductDefinition from '#product/domain/models/product_definition';

export const createProductDefinitionAdminResource = () => (
  {
    resource: new LucidResource(ProductDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          products: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'products',
            },
          },
        },
      }),
    ],
  }
);

export const createProductAdminResource = () => ({
  resource: new LucidResource(Product, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
