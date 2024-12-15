import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import PoliticalParty from '#political-party/domain/models/political_party';
import { Parliament } from '#legislature/domain/models/parliament';

export default class PoliticalPartySeatsParliament extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @column({ serializeAs: null })
  declare politicalPartyId: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  @column({ serializeAs: null })
  declare parliamentId: number;

  @belongsTo(() => Parliament)
  declare parliament: BelongsTo<typeof Parliament>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
