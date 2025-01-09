import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import Law from '#legislature/domain/models/law';
import Game from '#game/domain/models/game';
import type PropertyLaw from '#legislature/domain/models/property_law';

export default class LawGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare type: string;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => Law, {
    foreignKey: 'law_group_id',
  })
  declare propertyLaws: HasMany<typeof PropertyLaw>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
