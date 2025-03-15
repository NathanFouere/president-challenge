import { column, belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
import LawDefinition from '#law/domain/model/law_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class LawVotesPercentagePerPoliticalAffiliation extends TimeStampedModel {
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
}
