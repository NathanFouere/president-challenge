import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import SocialClass from '#social-class/domain/models/social_class';

export default class SocialClassHappinessPerTurn extends SaveAmountForTurn {
  public static readonly tableName = 'social_class_happiness_per_turns';

  @column()
  declare socialClassId: number;

  @belongsTo(() => SocialClass)
  declare socialClass: BelongsTo<typeof SocialClass>;

  constructor() {
    super();
    this.color = 'blue';
  }
}
