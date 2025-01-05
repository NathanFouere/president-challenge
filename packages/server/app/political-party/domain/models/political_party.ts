import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';
import PoliticalPartyHappinessPerTurn from '#political-party/domain/models/political_party_happiness_per_turn';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';

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
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
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

  @hasMany(() => PoliticalPartyHappinessPerTurn)
  declare happinessPerTurn: HasMany<typeof PoliticalPartyHappinessPerTurn>;

  @hasMany(() => PoliticalPartyHappinessModifier)
  declare happinessModifiers: HasMany<typeof PoliticalPartyHappinessModifier>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;

  public getHappinessLevel(): number {
    return this.happinessModifiers.reduce((acc, happinessModifier) => acc + happinessModifier.amount, 0);
  }
}
