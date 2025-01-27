import type Sector from '#sector/domain/model/sector';
import type State from '#state/domain/model/state';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type FinancialFlow from '#state/domain/model/financial_flow';
import { aFinancialFlow } from '#state/application/builder/financial_flow_builder';
import sectorEconomicalSituationMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };

export default class SectorService {
  private readonly sectorFinancialFlowColor = 'green';
  public async updateSectorsEconomicalSituation(sectors: Sector[], state: State, stateTurnFinancialFlows: StateTurnFinancialFlows): Promise<FinancialFlow> {
    let flowFromSectors = 0;
    for (const sector of sectors) {
      const added = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].state;
      flowFromSectors += added;
    }

    state.addToEconomicalSituation(flowFromSectors);

    return await aFinancialFlow()
      .withStateFinancialFlowId(stateTurnFinancialFlows.id)
      .withAmount(flowFromSectors)
      .withColor(this.sectorFinancialFlowColor)
      .withName('Sectors')
      .exist();
  }
}
