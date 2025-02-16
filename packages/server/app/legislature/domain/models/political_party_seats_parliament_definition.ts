import { column, hasMany } from '@adonisjs/lucid/orm';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class PoliticalPartySeatsParliamentDefinition extends TimeStampedModel {
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
}
