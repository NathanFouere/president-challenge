import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';

export interface TurnProcessorStep {
  execute(context: TurnDataContext): Promise<void>;
}
