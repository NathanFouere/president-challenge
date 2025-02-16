import { column, belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import PoliticalParty from '#political-party/domain/models/political_party';
import { Parliament } from '#legislature/domain/models/parliament';
import PoliticalPartySeatsParliamentDefinition
  from '#legislature/domain/models/political_party_seats_parliament_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class PoliticalPartySeatsParliament extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @column()
  declare politicalPartyId: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  @column()
  declare definitionId: number;

  @belongsTo(() => PoliticalPartySeatsParliamentDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof PoliticalPartySeatsParliamentDefinition>;

  @column()
  declare parliamentId: number;

  @belongsTo(() => Parliament)
  declare parliament: BelongsTo<typeof Parliament>;
}
