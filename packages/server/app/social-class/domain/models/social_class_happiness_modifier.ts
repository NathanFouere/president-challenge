import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';
import SocialClass from '#social-class/domain/models/social_class';

export default class SocialClassHappinessModifier extends HappinessModifier {
  public static readonly table = 'social_class_happiness_modifiers';

  @column()
  declare socialClassId: number;

  @belongsTo(() => SocialClass)
  declare socialClass: BelongsTo<typeof SocialClass>;
}
