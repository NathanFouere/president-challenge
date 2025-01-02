import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import PoliticalParty from '#political-party/domain/models/political_party';

export default class PoliticalPartyHappinessPerTurn extends SaveAmountForTurn {
  public static readonly tableName = 'social_class_happiness_per_turns';

  @column()
  declare politicalPartyId: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  constructor() {
    super();
    this.color = 'blue';
  }
}
