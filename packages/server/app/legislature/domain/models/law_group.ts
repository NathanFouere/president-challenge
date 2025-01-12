import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawCategory from '#legislature/domain/models/law_category';
import Law from '#legislature/domain/models/law';

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

  @hasMany(() => Law)
  declare laws: HasMany<typeof Law>;

  @column()
  declare lawCategoryId: number;

  @belongsTo(() => LawCategory)
  declare lawCategory: BelongsTo<typeof LawCategory>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
