import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetDtoFactory from '#budget/application/dto-factory/budget_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetBudgetQueryHandler from '#budget/application/query/i_get_budget_query_handler';
import GetBudgetQuery from '#budget/application/query/get_budget_query';

@inject()
export default class GetBudgetController {
  constructor(
    private readonly budgetDtoFactory: BudgetDtoFactory,
    private readonly getBudgetQueryHandler: IGetBudgetQueryHandler,
  ) {
  }

  public async getBudgetOfState({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const budgetId = request.param('budgetId');

      const budget = await this.getBudgetQueryHandler.handleForDisplay(new GetBudgetQuery(
        budgetId,
      ));

      return this.budgetDtoFactory.createFromBudget(budget);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
