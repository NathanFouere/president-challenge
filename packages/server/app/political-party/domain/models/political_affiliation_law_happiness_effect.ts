import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import PoliticalAffiliationHappinessEffect from '#political-party/domain/models/political_affiliation_happiness_effect';
import LawDefinition from '#law/domain/model/law_definition';

export default class PoliticalAffiliationLawHappinessEffect extends PoliticalAffiliationHappinessEffect {
  @column()
  declare lawDefinitionId: number;

  @belongsTo(() => LawDefinition)
  declare lawDefinition: BelongsTo<typeof LawDefinition>;
}
