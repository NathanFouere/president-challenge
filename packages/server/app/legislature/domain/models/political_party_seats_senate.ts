import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import PoliticalParty from '#political-party/domain/models/political_party';
import Senate from '#legislature/domain/models/senate';

export default class PoliticalPartySeatsSenate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @column({ serializeAs: null })
  declare politicalPartyId: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  @column({ serializeAs: null })
  declare senateId: number;

  @belongsTo(() => Senate)
  declare senate: BelongsTo<typeof Senate>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
