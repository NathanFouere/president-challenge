import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import State from '#state/domain/model/state';
import Game from '#game/domain/models/game';
import TaxDefinition from '#tax/domain/model/tax_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class Tax extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare definitionId: number;

  @belongsTo(() => TaxDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof TaxDefinition>;

  @column()
  declare rate: number;

  @column()
  declare level: TaxLevel;

  @column()
  declare stateId: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;

  public calculateTaxAmount(valueToTax: number): number {
    return Math.round(Math.max(0, valueToTax * (this.level * this.rate)));
  }
}
