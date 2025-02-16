import { column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import LawGroup from '#law/domain/model/law_group';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class LawCategory extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @hasMany(() => LawGroup)
  declare lawGroups: HasMany<typeof LawGroup>;
}
