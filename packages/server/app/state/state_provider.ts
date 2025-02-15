import AppProvider from '#common/provider';
import IStateRepository from '#state/domain/repository/i_state_repository';
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';
import IStateFinancialFlowRepository from '#state/domain/repository/i_state_financial_flow_repository';
import ISocialClassFinancialFlowRepository
  from '#social-class/domain/repository/i_social_class_financial_flow_repository';
import IStateDefinitionRepository from '#state/domain/repository/i_state_definition_repository';

export default class StateProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: StateRepository } = await import(
      '#state/infrastructure/repository/state_repository'
    );
    const { default: GetStateOfGameQueryHandler } = await import(
      '#state/infrastructure/query/get_state_of_game_query_handler'
    );

    const { default: StateFinancialFlowRepository } = await import(
      '#state/infrastructure/repository/state_financial_flow_repository'
    );

    const { default: SocialClassFinancialFlowRepository } = await import(
      '#social-class/infrastructure/repository/social_class_financial_flow_repository'
    );

    const { default: StateDefinitionRepository } = await import(
      '#state/infrastructure/repository/state_definition_repository'
    );

    this.app.container.bind(IStateDefinitionRepository, () => {
      return new StateDefinitionRepository();
    });

    this.app.container.bind(ISocialClassFinancialFlowRepository, () => {
      return new SocialClassFinancialFlowRepository();
    });

    this.app.container.bind(IStateFinancialFlowRepository, () => {
      return new StateFinancialFlowRepository();
    });

    this.app.container.bind(IGetStateOfGameQueryHandler, () => {
      return new GetStateOfGameQueryHandler();
    });

    this.app.container.bind(IStateRepository, () => {
      return new StateRepository();
    });
  }
}
