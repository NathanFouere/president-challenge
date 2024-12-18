import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';

export default class Product extends BaseModel {
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
  declare price: number;

  @column()
  declare costOfProduction: number;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
