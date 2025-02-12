import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import LawCategory from '#law/domain/model/law_category';
import LawDefinition from '#law/domain/model/law_definition';

export default class LawGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @hasMany(() => LawDefinition)
  declare definitions: HasMany<typeof LawDefinition>;

  @column()
  declare lawCategoryId: number;

  @belongsTo(() => LawCategory)
  declare lawCategory: BelongsTo<typeof LawCategory>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
