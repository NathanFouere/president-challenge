import type Sector from '#sector/domain/model/sector';
import type State from '#state/domain/model/state';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type StateFinancialFlow from '#state/domain/model/state_financial_flow';
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';
import sectorEconomicalSituationMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };
import type { StateTurnContext } from '#game/application/service/turn-service/load_turn_data_context_service';

export default class SectorService {
  private readonly sectorFinancialFlowColor = 'green';
  public async updateSectorsEconomicalSituation(sectors: Sector[], stateTurnContext: StateTurnContext): Promise<StateFinancialFlow> {
    let flowFromSectors = 0;
    for (const sector of sectors) {
      const added = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].state;
      flowFromSectors += added;
    }

    stateTurnContext.state.addToEconomicalSituation(flowFromSectors);

    return await aStateFinancialFlow()
      .withStateFinancialFlowId(stateTurnContext.stateTurnFinancialFlows.id)
      .withAmount(flowFromSectors)
      .withColor(this.sectorFinancialFlowColor)
      .withName('Sectors')
      .exist();
  }
}
