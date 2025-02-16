import { column, belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import PoliticalParty from '#political-party/domain/models/political_party';
import Senate from '#legislature/domain/models/senate';
import PoliticalPartySeatsSenateDefinition from '#legislature/domain/models/political_party_seats_senate_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class PoliticalPartySeatsSenate extends TimeStampedModel {
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

  @belongsTo(() => PoliticalPartySeatsSenateDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof PoliticalPartySeatsSenateDefinition>;

  @column()
  declare senateId: number;

  @belongsTo(() => Senate)
  declare senate: BelongsTo<typeof Senate>;
}
