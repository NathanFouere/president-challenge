import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import State from '#state/domain/model/state';
import type { BudgetLevel } from '#budget/domain/model/budget_level';
import BudgetLevelPerTurn from '#budget/domain/model/budget_level_per_turn';
import Game from '#game/domain/models/game';
import BudgetDefinition from '#budget/domain/model/budget_definition';

export default class Budget extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare definitionId: number;

  @belongsTo(() => BudgetDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof BudgetDefinition>;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare level: BudgetLevel;

  @column()
  declare stateId: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;

  @hasMany(() => BudgetLevelPerTurn)
  declare levelPerTurn: HasMany<typeof BudgetLevelPerTurn>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
