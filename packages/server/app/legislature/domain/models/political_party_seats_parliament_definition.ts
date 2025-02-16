import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';

export default class PoliticalPartySeatsParliamentDefinition extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare defaultNumberOfSeats: number;

  @column()
  declare politicalPartyAffiliation: PoliticalAffiliation;

  @hasMany(() => PoliticalPartySeatsParliament, {
    foreignKey: 'definitionId',
  })
  declare politicalPartySeatsSenate: HasMany<typeof PoliticalPartySeatsParliament>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
