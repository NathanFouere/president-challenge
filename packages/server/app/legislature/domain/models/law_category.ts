import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawGroup from '#legislature/domain/models/law_group';

export default class LawCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => LawGroup)
  declare lawGroups: HasMany<typeof LawGroup>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
