import type State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';

export default abstract class IGetStateOfGameQueryHandler {
  public abstract handle(query: GetStateOfGameQuery): Promise<State>;
  public abstract handleForDisplay(query: GetStateOfGameQuery): Promise<State>;
  public abstract handleForSwitchTurn(query: GetStateOfGameQuery): Promise<State>;
}
