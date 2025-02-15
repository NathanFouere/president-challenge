import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import SocialClassHappinessEffect from '#social-class/domain/models/social_class_happiness_effect';
import LawDefinition from '#law/domain/model/law_definition';

export default class SocialClassLawHappinessEffect extends SocialClassHappinessEffect {
  @column()
  declare lawDefinitionId: number;

  @belongsTo(() => LawDefinition)
  declare lawDefinition: BelongsTo<typeof LawDefinition>;
}
