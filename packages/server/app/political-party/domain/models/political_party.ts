import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@shared/types/dist/types/political-party/political-affiliation.js';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';

export default class PoliticalParty extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare color: string;

  @column()
  declare affiliation: PoliticalAffiliation;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column({ serializeAs: null })
  declare licensedFileIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
