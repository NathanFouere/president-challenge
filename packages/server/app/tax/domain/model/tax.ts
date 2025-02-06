import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import State from '#state/domain/model/state';
import Game from '#game/domain/models/game';

export default class Tax extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare baseRate: number;

  @column()
  declare color: string;

  @column()
  declare type: TaxType;

  @column()
  declare level: TaxLevel;

  @column()
  declare stateId: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public calculateTaxAmount(valueToTax: number): number {
    return Math.round(Math.max(0, valueToTax * (this.level * this.baseRate)));
  }
}
