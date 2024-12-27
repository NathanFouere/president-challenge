import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { DateTime } from 'luxon';
import type { HappinessLevels } from '@shared/dist/common/happiness-levels.js';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';

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

  @column()
  declare happinessLevel: HappinessLevels;

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

  @hasMany(() => PoliticalPartySeatsSenate)
  declare senateSeats: HasMany<typeof PoliticalPartySeatsSenate>;

  @hasMany(() => PoliticalPartySeatsParliament)
  declare parliamentSeats: HasMany<typeof PoliticalPartySeatsParliament>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
