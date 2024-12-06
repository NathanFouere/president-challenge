import { BaseModel, column } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';

export default class LicensedFile extends BaseModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare title: string;

  @column()
  declare attribution: string | null;

  @column()
  declare source: string | null;

  @column()
  declare license: string | null;

  @column()
  declare date: string | null;

  @column()
  declare path: string;

  @column()
  declare isVideo: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
