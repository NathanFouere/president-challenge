import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import SocialClassHappinessEffect from '#social-class/domain/models/social_class_happiness_effect';
import LawEffect from '#law/domain/model/law-effect/law_effect';

export default class SocialClassLawHappinessEffect extends SocialClassHappinessEffect {
  @column()
  declare lawEffectIdentifier: string;

  @belongsTo(() => LawEffect)
  declare lawEffect: BelongsTo<typeof LawEffect>;
}
