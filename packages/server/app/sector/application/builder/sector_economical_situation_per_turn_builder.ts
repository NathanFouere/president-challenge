import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import SectorEconomicalSituationPerTurn from '#sector/domain/model/sector_economical_situation_per_turn';

export default class SectorEconomicalSituationPerTurnBuilder extends SaveAmountForTurnBuilder {
  private sectorId: number | null = null;

  public withSectorId(sectorId: number): this {
    this.sectorId = sectorId;
    return this;
  }

  public build(): SectorEconomicalSituationPerTurn {
    const sectorEconomicalSituationPerTurn = new SectorEconomicalSituationPerTurn();

    if (this.amount !== null) sectorEconomicalSituationPerTurn.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) sectorEconomicalSituationPerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.sectorId) sectorEconomicalSituationPerTurn.sectorId = this.sectorId;
    else throw new Error('Sector id is required');

    return sectorEconomicalSituationPerTurn;
  }
}

export function aSectorEconomicalSituationPerTurn(): SectorEconomicalSituationPerTurnBuilder {
  return new SectorEconomicalSituationPerTurnBuilder();
}
