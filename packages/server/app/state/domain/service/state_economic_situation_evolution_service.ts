import type Sector from '#sector/domain/model/sector';
import sectorEconomicalSituationMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };
import type State from '#state/domain/model/state';

export default class StateEconomicalSituationEvolutionService {
  public propagateEconomicalSituationToState(sector: Sector, state: State): void {
    const added = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].state;
    state.addToEconomicalSituation(added);
  }
}
