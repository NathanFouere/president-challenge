import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import PropertyLaw from '#legislature/domain/models/property_law';
import LawCategory from '#legislature/domain/models/law_category';

export default class LawGroup extends BaseModel {
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

  @hasMany(() => PropertyLaw)
  declare propertyLaws: HasMany<typeof PropertyLaw>;

  @column()
  declare lawCategoryId: number;

  @belongsTo(() => LawCategory)
  declare lawCategory: BelongsTo<typeof LawCategory>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
