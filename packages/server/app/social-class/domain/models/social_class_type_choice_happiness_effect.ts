import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import SocialClassTypeHappinessEffect from '#social-class/domain/models/social_class_type_happiness_effect';
import ChoiceDefinition from '#event/domain/models/choice_definition';

export default class SocialClassTypeChoiceHappinessEffect extends SocialClassTypeHappinessEffect {
  @column()
  declare choiceDefinitionId: number;

  @belongsTo(() => ChoiceDefinition)
  declare choiceDefinition: BelongsTo<typeof ChoiceDefinition>;
}
