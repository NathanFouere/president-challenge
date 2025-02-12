import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IBudgetRepository from '#state/domain/repository/i_budget_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetBudgetByGameAndTypeQueryHandler from '#state/application/query/i_get_budget_by_game_and_type_query_handler';
import GetBudgetByGameAndTypeQuery from '#state/application/query/get_budget_by_game_and_type_query';
import type Law from '#law/domain/model/law';

@inject()
export default class ApplyBudgetLawEffectService {
  constructor(
    private readonly budgetRepository: IBudgetRepository,
    private readonly getBudgetByGameAndTypeQueryHandler: IGetBudgetByGameAndTypeQueryHandler,
  ) {
  }

  public async apply(law: Law): Promise<void> {
    const budget = await this.getBudgetByGameAndTypeQueryHandler.handle(
      new GetBudgetByGameAndTypeQuery(law.gameId, law.definition.budgetTypeToChange!),
    );

    budget.level = law.definition.budgetLevelToChange!;

    await this.budgetRepository.save(budget);
  }
}
