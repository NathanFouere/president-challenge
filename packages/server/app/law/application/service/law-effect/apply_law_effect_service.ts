import { inject } from '@adonisjs/core';
import type Law from '#law/domain/model/law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorPropertyLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_sector_property_law_effect_by_game_and_law_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetBudgetLevelLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_budget_level_law_effect_by_game_and_law_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetTaxLevelLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_tax_level_law_effect_by_game_and_law_query_handler';
import { LawType } from '#law/domain/model/law_type';
import GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyTaxLevelLawEffectService from '#law/application/service/law-effect/apply_tax_level_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplySectorPropertyLawEffectService
  from '#law/application/service/law-effect/apply_sector_property_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyBudgetLevelLawEffectService
  from '#law/application/service/law-effect/apply_budget_level_law_effect_service';

@inject()
export default class ApplyLawEffectService {
  constructor(
    private readonly getBudgetLevelLawEffectByGameAndLawQueryHandler: IGetBudgetLevelLawEffectByGameAndLawQueryHandler,
    private readonly getTaxLevelLawEffectByGameAndLawQueryHandler: IGetTaxLevelLawEffectByGameAndLawQueryHandler,
    private readonly getSectorPropertyLawEffectByGameAndLawQueryHandler: IGetSectorPropertyLawEffectByGameAndLawQueryHandler,
    private readonly applySectorPropertyLawEffectService: ApplySectorPropertyLawEffectService,
    private readonly applyBudgetLevelLawEffectService: ApplyBudgetLevelLawEffectService,
    private readonly applyTaxLevelLawEffectService: ApplyTaxLevelLawEffectService,
  ) {
  }

  public async applyLawEffect(law: Law, gameId: number): Promise<void> {
    let lawEffect;
    switch (law.type) {
      case LawType.BUDGET_LEVEL:
        lawEffect = await this.getBudgetLevelLawEffectByGameAndLawQueryHandler.handle(new GetLawEffectByGameAndLawQuery(
          gameId,
          law.id,
          law.type,
        ));
        await this.applyBudgetLevelLawEffectService.applyBudgetLevelLawEffect(lawEffect);
        break;
      case LawType.TAX_LEVEL:
        lawEffect = await this.getTaxLevelLawEffectByGameAndLawQueryHandler.handle(new GetLawEffectByGameAndLawQuery(
          gameId,
          law.id,
          law.type,
        ));
        await this.applyTaxLevelLawEffectService.applyTaxLevelLawEffect(lawEffect);
        break;
      case LawType.SECTOR_PROPERTY:
        lawEffect = await this.getSectorPropertyLawEffectByGameAndLawQueryHandler.handle(new GetLawEffectByGameAndLawQuery(
          gameId,
          law.id,
          law.type,
        ));
        await this.applySectorPropertyLawEffectService.applySectorPropertyLawEffect(lawEffect);
        break;
      default:
        throw new Error(`Unknown law type: ${law.type}`);
    }
  }
}
