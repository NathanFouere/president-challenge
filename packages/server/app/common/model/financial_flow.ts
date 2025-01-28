import { column, BaseModel } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';

export default class FinancialFlow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare amount: number;

  @column()
  declare color: string;

  @column()
  declare name: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
