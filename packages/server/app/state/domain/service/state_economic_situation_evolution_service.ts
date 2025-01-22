import type Sector from '#sector/domain/model/sector';
import sectorEconomicalSituationMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };
import type State from '#state/domain/model/state';

export default class StateEconomicalSituationEvolutionService {
  public propagateEconomicalSituationToState(sectors: Sector[], state: State): void {
    sectors.forEach((sector: Sector) => this.applySectorEconomicalSituationToState(sector, state));
    this.applyStateBudgets(state);
  }

  private applySectorEconomicalSituationToState(sector: Sector, state: State): void {
    const added = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].state;
    state.addToEconomicalSituation(added);
  }

  private applyStateBudgets(state: State): void {
    for (const budget of state.budgets) {
      state.addToEconomicalSituation(-budget.level);
    }
  }
}
