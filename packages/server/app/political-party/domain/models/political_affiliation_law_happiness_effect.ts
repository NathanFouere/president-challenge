import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import PoliticalAffiliationHappinessEffect from '#political-party/domain/models/political_affiliation_happiness_effect';

export default class PoliticalAffiliationLawHappinessEffect extends PoliticalAffiliationHappinessEffect {
  @column()
  declare lawEffectIdentifier: string;

  @belongsTo(() => LawEffect)
  declare lawEffect: BelongsTo<typeof LawEffect>;
}
