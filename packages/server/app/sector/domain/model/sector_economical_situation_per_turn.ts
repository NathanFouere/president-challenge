import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import Sector from '#sector/domain/model/sector';

export default class SectorEconomicalSituationPerTurn extends SaveAmountForTurn {
  public static readonly tableName = 'sector_economical_situation_per_turns';

  @column()
  declare sectorId: number;

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>;

  constructor() {
    super();
    this.color = 'red';
  }
}
