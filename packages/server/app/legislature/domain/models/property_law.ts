import { column } from '@adonisjs/lucid/orm';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import Law from '#legislature/domain/models/law';

export default class PropertyLaw extends Law {
  public static readonly table = 'property_laws';

  @column()
  declare sectorType: SectorTypes;

  @column()
  declare sectorOwnershipTypeTo: SectorOwnershipType;
}
