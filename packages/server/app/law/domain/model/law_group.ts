import { column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import LawCategory from '#law/domain/model/law_category';
import LawDefinition from '#law/domain/model/law_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class LawGroup extends TimeStampedModel {
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
}
