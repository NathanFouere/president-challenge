import { column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorEconomicalSituation } from '@shared/dist/sector/sector-economical-situation.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import ProductDefinition from '#product/domain/models/product_definition';
import Sector from '#sector/domain/model/sector';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class SectorDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare type: SectorTypes;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare licensedFileIdentifier: string;

  @column()
  declare defaultEconomicalSituation: SectorEconomicalSituation;

  @column()
  declare defaultOwnershipType: SectorOwnershipType;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @hasMany(() => ProductDefinition)
  declare productsDefinition: HasMany<typeof ProductDefinition>;

  @hasMany(() => Sector, {
    foreignKey: 'definitionId',
  })
  declare sectors: HasMany<typeof Sector>;
}
