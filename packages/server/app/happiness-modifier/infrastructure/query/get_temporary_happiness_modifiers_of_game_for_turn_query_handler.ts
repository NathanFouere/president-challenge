import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';
import type GetTemporaryHappinessModifiersOfGameForTurnQuery
  from '#happiness-modifier/application/query/get_temporary_happiness_modifiers_of_game_for_turn_query';
import type IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler
  from '#happiness-modifier/application/query/i_get_temporary_happiness_modifiers_of_game_for_turn_query_handler';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';
import SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';

export default class GetTemporaryHappinessModifiersOfGameForTurnQueryHandler implements IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler {
  public async handle(query: GetTemporaryHappinessModifiersOfGameForTurnQuery): Promise<HappinessModifier[]> {
    const [politicalPartiesHappinessModifiers, socialClassHappinessModifiers] = await Promise.all([
      PoliticalPartyHappinessModifier
        .query()
        .join('political_parties', 'political_parties.id', 'political_party_happiness_modifiers.political_party_id')
        .where('political_parties.game_id', query.gameId)
        .where('type', HappinessModifierType.TEMPORARY)
        .where('duration', '>', 0)
        .select('political_party_happiness_modifiers.*') // Sélectionne uniquement les colonnes de cette table
        .preload('politicalParty')
        .exec(),
      SocialClassHappinessModifier
        .query()
        .join('social_classes', 'social_classes.id', 'social_class_happiness_modifiers.social_class_id')
        .where('social_classes.game_id', query.gameId)
        .where('social_class_happiness_modifiers.type', HappinessModifierType.TEMPORARY)
        .where('duration', '>', 0)
        .select('social_class_happiness_modifiers.*') // Sélectionne uniquement les colonnes de cette table
        .preload('socialClass')
        .exec(),
    ]);

    return [...politicalPartiesHappinessModifiers, ...socialClassHappinessModifiers];
  }
}
