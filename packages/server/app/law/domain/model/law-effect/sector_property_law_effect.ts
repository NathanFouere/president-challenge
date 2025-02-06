import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import Sector from '#sector/domain/model/sector';

export default class SectorPropertyLawEffect extends LawEffect {
  @column()
  declare sectorId: number;

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>;

  @column()
  declare ownershipType: SectorOwnershipType;

  public apply(): void {
    this.sector.ownershipType = this.ownershipType;
  }
}
