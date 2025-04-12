import { LucidResource } from '@adminjs/adonis';
import { targetRelationSettingsFeature } from '@adminjs/relations';
import Game from '#game/domain/models/game';
import GameDefinition from '#game/domain/models/game_definition';

export const createGameAdminResource = () => (
  {
    resource: new LucidResource(Game, 'postgres'),
    features: [targetRelationSettingsFeature()],
  }
);

export const createGameDefinitionAdminResource = () => (
  {
    resource: new LucidResource(GameDefinition, 'postgres'),
    features: [targetRelationSettingsFeature()],
  }
);
