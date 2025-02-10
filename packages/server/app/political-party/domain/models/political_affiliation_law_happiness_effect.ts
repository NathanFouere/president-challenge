import PoliticalPartyHappinessEffect from '#political-party/domain/models/political_party_happiness_effect';
import LawEffect from '#law/domain/model/law-effect/law_effect';

export default class PoliticalPartyLawHappinessEffect extends PoliticalPartyHappinessEffect {
  @column()
  declare lawEffectIdentifier: string;

  @belongsTo(() => LawEffect)
  declare lawEffect: BelongsTo<typeof LawEffect>;
}
