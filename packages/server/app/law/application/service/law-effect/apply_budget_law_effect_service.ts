import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IBudgetRepository from '#state/domain/repository/i_budget_repository';
import type LawEffect from '#law/domain/model/law-effect/law_effect';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetBudgetByGameAndTypeQueryHandler from '#state/application/query/i_get_budget_by_game_and_type_query_handler';
import GetBudgetByGameAndTypeQuery from '#state/application/query/get_budget_by_game_and_type_query';

@inject()
export default class ApplyBudgetLawEffectService {
  constructor(
    private readonly budgetRepository: IBudgetRepository,
    private readonly getBudgetByGameAndTypeQueryHandler: IGetBudgetByGameAndTypeQueryHandler,
  ) {
  }

  public async apply(lawEffect: LawEffect, gameId: number): Promise<void> {
    const budget = await this.getBudgetByGameAndTypeQueryHandler.handle(
      new GetBudgetByGameAndTypeQuery(gameId, lawEffect.budgetTypeToChange!),
    );

    budget.level = lawEffect.budgetLevelToChange!;

    await this.budgetRepository.save(budget);
  }
}
