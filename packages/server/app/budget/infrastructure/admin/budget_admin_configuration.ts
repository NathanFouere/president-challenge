import process from 'node:process';
import { owningRelationSettingsFeature, RelationType, targetRelationSettingsFeature } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import BudgetDefinition from '#budget/domain/model/budget_definition';
import Budget from '#budget/domain/model/budget';

export const createBudgetDefinitionAdminResource = () => (
  {
    resource: new LucidResource(BudgetDefinition, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          budgets: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'definitionId',
              resourceId: 'budgets',
            },
          },
        },
      }),
    ],
  }
);

export const createBudgetAdminResource = () => ({
  resource: new LucidResource(Budget, 'postgres'),
  features: [targetRelationSettingsFeature()],
});
