import { column } from '@adonisjs/lucid/orm';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import LawEffect from '#law/domain/model/law-effect/law_effect';

export default class SectorPropertyLawEffect extends LawEffect {
  @column()
  declare sectorType: SectorTypes;

  @column()
  declare ownershipType: SectorOwnershipType;
}
