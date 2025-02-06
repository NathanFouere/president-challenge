import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetBudgetByGameAndTypeQueryHandler from '#state/application/query/i_get_budget_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetTaxByGameAndTypeQueryHandler from '#tax/application/query/i_get_tax_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';
import { LawType } from '#law/domain/model/law_type';
import { aBudgetLevelLawEffect } from '#law/application/builder/law-effect/budget_level_law_effect_builder';
import type {
  BudgetLevelLawEffectStartupInterface,
  LawEffectStartupInterface, SectorPropertyLawEffectStartupInterface, TaxLevelLawEffectStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law-effect/law_effect_startup_interface';
import GetBudgetByGameAndTypeQuery from '#state/application/query/get_budget_by_game_and_type_query';
import { aTaxLevelLawEffect } from '#law/application/builder/law-effect/tax_level_law_effect_builder';
import GetTaxByGameAndTypeQuery from '#tax/application/query/get_tax_by_game_and_type_query';
import { aSectorPropertyLawEffect } from '#law/application/builder/law-effect/sector_property_law_effect_builder';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';

@inject()
export default class LawEffectStartupService {
  constructor(
    private readonly getBudgetByGameAndTypeQueryHandler: IGetBudgetByGameAndTypeQueryHandler,
    private readonly getTaxByGameAndTypeQueryHandler: IGetTaxByGameAndTypeQueryHandler,
    private readonly getSectorByGameAndTypeQueryHandler: IGetSectorByGameAndTypeQueryHandler,
  ) {
  }

  public async createLawEffect(lawId: number, lawType: LawType, lawEffectStartupInterface: LawEffectStartupInterface, gameId: number): Promise<void> {
    switch (lawType) {
      case LawType.BUDGET_LEVEL:
        await this.createBudgetEffect(lawId, lawEffectStartupInterface as BudgetLevelLawEffectStartupInterface, gameId);
        break;
      case LawType.TAX_LEVEL:
        await this.createTaxEffect(lawId, lawEffectStartupInterface as TaxLevelLawEffectStartupInterface, gameId);
        break;
      case LawType.SECTOR_PROPERTY:
        await this.createSectorPropertyEffect(lawId, lawEffectStartupInterface as SectorPropertyLawEffectStartupInterface, gameId);
        break;
      default:
        throw new Error('Invalid law type');
    }
  }

  private async createBudgetEffect(lawId: number, budgetEffectStartupInterface: BudgetLevelLawEffectStartupInterface, gameId: number): Promise<void> {
    const budget = await this.getBudgetByGameAndTypeQueryHandler.handle(
      new GetBudgetByGameAndTypeQuery(
        gameId,
        budgetEffectStartupInterface.budgetType,
      ),
    );

    await aBudgetLevelLawEffect()
      .withLawId(lawId)
      .withGameId(gameId)
      .withBudgetId(budget.id)
      .withLevel(budgetEffectStartupInterface.budgetLevel)
      .exists();
  }

  private async createTaxEffect(lawId: number, taxEffectStartupInterface: TaxLevelLawEffectStartupInterface, gameId: number): Promise<void> {
    const tax = await this.getTaxByGameAndTypeQueryHandler.handle(
      new GetTaxByGameAndTypeQuery(
        gameId,
        taxEffectStartupInterface.taxType,
      ),
    );

    await aTaxLevelLawEffect()
      .withLawId(lawId)
      .withGameId(gameId)
      .withTaxId(tax.id)
      .withLevel(taxEffectStartupInterface.taxLevel)
      .exists();
  }

  private async createSectorPropertyEffect(lawId: number, sectorPropertyEffectStartupInterface: SectorPropertyLawEffectStartupInterface, gameId: number): Promise<void> {
    const sector = await this.getSectorByGameAndTypeQueryHandler.handle(
      new GetSectorByGameAndTypeQuery(
        gameId,
        sectorPropertyEffectStartupInterface.sectorType,
      ),
    );

    await aSectorPropertyLawEffect()
      .withLawId(lawId)
      .withGameId(gameId)
      .withSectorId(sector.id)
      .withOwnershipType(sectorPropertyEffectStartupInterface.ownershipType)
      .exists();
  }
}
