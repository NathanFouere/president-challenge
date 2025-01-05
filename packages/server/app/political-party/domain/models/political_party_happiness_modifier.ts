import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';
import PoliticalParty from '#political-party/domain/models/political_party';

export default class PoliticalPartyHappinessModifier extends HappinessModifier {
  public static readonly table = 'political_party_happiness_modifiers';

  @column()
  declare politicalPartyId: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;
}
