import { column } from '@adonisjs/lucid/orm';
import { TimeStampedModel } from '#common/model/timestamped_model';

export abstract class SaveAmountForTurn extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare amount: number;

  @column()
  declare turn: number;

  @column()
  declare color: string;
}
