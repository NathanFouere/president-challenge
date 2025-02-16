import type { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export abstract class TimeStampedModel extends BaseModel {
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
