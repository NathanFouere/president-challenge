import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Law from '#law/domain/model/law';
import PoliticalParty from '#political-party/domain/models/political_party';

export default class LawVotesPercentagePerPoliticalParty extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare lawId: number;

  @belongsTo(() => Law)
  declare law: BelongsTo<typeof Law>;

  @column()
  declare politicalPartyId: number;

  @column()
  declare percentage: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
