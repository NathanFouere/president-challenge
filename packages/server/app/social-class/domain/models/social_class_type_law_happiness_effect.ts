import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import SocialClassTypeHappinessEffect from '#social-class/domain/models/social_class_type_happiness_effect';
import LawDefinition from '#law/domain/model/law_definition';

export default class SocialClassTypeLawHappinessEffect extends SocialClassTypeHappinessEffect {
  @column()
  declare lawDefinitionId: number;

  @belongsTo(() => LawDefinition)
  declare lawDefinition: BelongsTo<typeof LawDefinition>;
}
