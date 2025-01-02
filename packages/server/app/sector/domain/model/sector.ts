import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorEconomicalSituation } from '@shared/dist/sector/sector-economical-situation.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import Product from '#product/domain/models/product';
import SocialClass from '#social-class/domain/models/social_class';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';
import SectorEconomicalSituationPerTurn from '#sector/domain/model/sector_economical_situation_per_turn';

export default class Sector extends BaseModel {
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
  declare economicalSituation: SectorEconomicalSituation;

  @column()
  declare ownershipType: SectorOwnershipType;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>;

  @hasMany(() => SocialClass)
  declare socialClasses: HasMany<typeof SocialClass>;

  @hasMany(() => SectorEconomicalSituationPerTurn)
  declare economicalSituationPerTurn: HasMany<typeof SectorEconomicalSituationPerTurn>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
