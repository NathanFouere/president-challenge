import { BaseModel, column } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';

export abstract class SaveAmountForTurn extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare amount: number;

  @column()
  declare turn: number;

  @column()
  declare color: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
