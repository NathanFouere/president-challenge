import AppProvider from '#common/provider';
import ILawVoteRepository from '#law/domain/repository/i_law_vote_repository';
import IGetLawVoteQueryHandler from '#law/application/query/i_get_law_vote_query_handler';
import ILawRepository from '#law/domain/repository/i_law_repository';
import ILawGroupRepository from '#law/domain/repository/i_law_group_repository';
import IGetLawGroupsByGameQueryHandler from '#law/application/query/i_get_law_groups_by_game_query_handler';
import ILawCategoryRepository from '#law/domain/repository/i_law_category_repository';
import IGetLawCategoriesByGameQueryHandler
  from '#law/application/query/i_get_law_categories_by_game_query_handler';
import {
  IGetLawByGameAndTypeQueryHandler,
} from '#law/application/query/i_get_law_by_game_and_type_query_handler';
import {
  IGetLastLawVoteResultsInGameQueryHandler,
} from '#law/application/query/i_get_last_law_vote_results_in_game_query_handler';
import { ILawVoteResultsRepository } from '#law/domain/repository/i_law_vote_results_repository';
import IGetBudgetLevelLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_budget_level_law_effect_by_game_and_law_query_handler';
import IGetTaxLevelLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_tax_level_law_effect_by_game_and_law_query_handler';
import IGetSectorPropertyLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_sector_property_law_effect_by_game_and_law_query_handler';

export default class LawProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: LawRepository } = await import(
      '#law/infrastructure/repositories/law_repository'
    );
    const { default: LawGroupRepository } = await import(
      '#law/infrastructure/repositories/law_group_repository'
    );
    const { default: GetLawGroupsByGameQueryHandler } = await import(
      '#law/infrastructure/query/get_law_groups_by_game_query_handler'
    );
    const { default: LawCategoryRepository } = await import(
      '#law/infrastructure/repositories/law_category_repository'
    );
    const { default: GetLawCategoriesByGameQueryHandler } = await import(
      '#law/infrastructure/query/get_law_categories_by_game_query_handler'
    );
    const { default: GetLawByGameAndTypeQueryHandler } = await import(
      '#law/infrastructure/query/get_law_by_game_and_type_query_handler'
    );
    const { default: LawVoteResultsRepository } = await import(
      '#law/infrastructure/repositories/law_vote_results_repository'
    );
    const { default: GetLastLawVoteResultsInGameQueryHandler } = await import(
      '#law/infrastructure/query/get_last_law_vote_results_in_game_query_handler'
    );
    const { default: GetLawVoteQueryHandler } = await import(
      '#law/infrastructure/query/get_law_vote_query_handler'
    );
    const { default: LawVoteRepository } = await import(
      '#law/infrastructure/repositories/law_vote_repository'
    );

    const { default: GetBudgetLevelLawEffectByGameAndLawQueryHandler } = await import(
      '#law/infrastructure/query/law-effect/get_budget_level_law_effect_by_game_and_law_query_handler'
    );

    const { default: GetTaxLevelLawEffectByGameAndLawQueryHandler } = await import(
      '#law/infrastructure/query/law-effect/get_tax_level_law_effect_by_game_and_law_query_handler'
    );

    const { default: GetSectorPropertyLawEffectByGameAndLawQueryHandler } = await import(
      '#law/infrastructure/query/law-effect/get_sector_property_law_effect_by_game_and_law_query_handler'
    );

    this.app.container.bind(IGetSectorPropertyLawEffectByGameAndLawQueryHandler, () => {
      return new GetSectorPropertyLawEffectByGameAndLawQueryHandler();
    });

    this.app.container.bind(IGetBudgetLevelLawEffectByGameAndLawQueryHandler, () => {
      return new GetBudgetLevelLawEffectByGameAndLawQueryHandler();
    });

    this.app.container.bind(IGetTaxLevelLawEffectByGameAndLawQueryHandler, () => {
      return new GetTaxLevelLawEffectByGameAndLawQueryHandler();
    });

    this.app.container.bind(ILawVoteRepository, () => {
      return new LawVoteRepository();
    });
    this.app.container.bind(IGetLawVoteQueryHandler, () => {
      return new GetLawVoteQueryHandler();
    });
    this.app.container.bind(ILawRepository, () => {
      return new LawRepository();
    });
    this.app.container.bind(ILawGroupRepository, () => {
      return new LawGroupRepository();
    });
    this.app.container.bind(IGetLawGroupsByGameQueryHandler, () => {
      return new GetLawGroupsByGameQueryHandler();
    });
    this.app.container.bind(ILawCategoryRepository, () => {
      return new LawCategoryRepository();
    });
    this.app.container.bind(IGetLawCategoriesByGameQueryHandler, () => {
      return new GetLawCategoriesByGameQueryHandler();
    });
    this.app.container.bind(IGetLawByGameAndTypeQueryHandler, () => {
      return new GetLawByGameAndTypeQueryHandler();
    });
    this.app.container.bind(IGetLastLawVoteResultsInGameQueryHandler, () => {
      return new GetLastLawVoteResultsInGameQueryHandler();
    });
    this.app.container.bind(ILawVoteResultsRepository, () => {
      return new LawVoteResultsRepository();
    });
  }
}
