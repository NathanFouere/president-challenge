import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import LawGroup from '#law/domain/model/law_group';

export default class LawCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @hasMany(() => LawGroup)
  declare lawGroups: HasMany<typeof LawGroup>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
