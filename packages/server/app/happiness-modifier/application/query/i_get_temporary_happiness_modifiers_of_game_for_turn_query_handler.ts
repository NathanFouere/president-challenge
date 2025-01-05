import type HappinessModifier from '#happiness-modifier/domain/model/happiness_modifier';
import type GetTemporaryHappinessModifiersOfGameForTurnQuery
  from '#happiness-modifier/application/query/get_temporary_happiness_modifiers_of_game_for_turn_query';

export default abstract class IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler {
  abstract handle(query: GetTemporaryHappinessModifiersOfGameForTurnQuery): Promise<HappinessModifier[]>;
}
