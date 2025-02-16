import { LucidResource } from '@adminjs/adonis';
import { targetRelationSettingsFeature } from '@adminjs/relations';
import Game from '#game/domain/models/game';

export const createGameAdminResource = () => (
  {
    resource: new LucidResource(Game, 'postgres'),
    features: [targetRelationSettingsFeature()],
  }
);
