import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { SectorTypes } from '@shared/types/dist/types/sector/sector-types.js';
import Product from '#product/domain/models/product';
import SocialClass from '#social-class/domain/models/social_class';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
