import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import LawDefinition from '#law/domain/model/law_definition';

export default class LawVotesPercentagePerPoliticalAffiliation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare lawDefinitionId: number;

  @belongsTo(() => LawDefinition)
  declare lawDefinition: BelongsTo<typeof LawDefinition>;

  @column()
  declare politicalAffiliation: PoliticalAffiliation;

  @column()
  declare percentage: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
