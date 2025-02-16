import process from 'node:process';
import { owningRelationSettingsFeature, RelationType } from '@adminjs/relations';
import { LucidResource } from '@adminjs/adonis';
import componentLoader from '../../../admin/component_loader.js';
import User from '#user/domain/models/user';

export const createUsersAdminResource = () => (
  {
    resource: new LucidResource(User, 'postgres'),
    features: [
      owningRelationSettingsFeature({
        componentLoader,
        licenseKey: process.env.ADMINJS_RELATIONS_LICENSE!,
        relations: {
          games: {
            type: RelationType.OneToMany,
            target: {
              joinKey: 'userId',
              resourceId: 'games',
            },
          },
        },
      }),
    ],
  }
);
