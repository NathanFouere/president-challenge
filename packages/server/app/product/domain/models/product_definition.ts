import { BaseModel, belongsTo, column, hasOne, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import SectorDefinition from '#sector/domain/model/sector_definition';
import Product from '#product/domain/models/product';

export default class ProductDefinition extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare licensedFileIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @column()
  declare sectorDefinitionId: number;

  @belongsTo(() => SectorDefinition)
  declare sectorDefinition: BelongsTo<typeof SectorDefinition>;

  @hasMany(() => Product, {
    foreignKey: 'definitionId',
  })
  declare products: HasMany<typeof Product>;

  @column()
  declare defaultPrice: number;

  @column()
  declare defaultCostOfProduction: number;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
