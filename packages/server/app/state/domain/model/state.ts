import { belongsTo, column, hasMany, beforeSave } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import Budget from '#budget/domain/model/budget';
import StateEconomicalSituationPerTurn from '#state/domain/model/state_economical_situation_per_turn';
import Tax from '#tax/domain/model/tax';
import sectorEconomicalSituationMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';
import StateFinancialFlow from '#state/domain/model/state_financial_flow';
import type Sector from '#sector/domain/model/sector';
import StateDefinition from '#state/domain/model/state_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class State extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare economicalSituation: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare definitionId: number;

  @belongsTo(() => StateDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof StateDefinition>;

  @hasMany(() => StateFinancialFlow)
  declare financialFlows: HasMany<typeof StateFinancialFlow>;

  @hasMany(() => StateEconomicalSituationPerTurn)
  declare economicalSituationPerTurn: HasMany<typeof StateEconomicalSituationPerTurn>;

  @hasMany(() => Budget)
  declare budgets: HasMany<typeof Budget>;

  @hasMany(() => Tax)
  declare taxes: HasMany<typeof Tax>;

  public addToEconomicalSituation(addedEconomicalSituation: number) {
    let newEconomicalSituation = this.economicalSituation + addedEconomicalSituation;
    if (newEconomicalSituation > 100) {
      newEconomicalSituation = 100;
    }
    if (newEconomicalSituation < 0) {
      newEconomicalSituation = 0;
    }
    this.economicalSituation = newEconomicalSituation;
  }

  public applyBudgets(turn: number): StateFinancialFlow[] {
    let totalBudgetsCosts = 0;
    const financialFlows = [];
    for (const budget of this.budgets) {
      totalBudgetsCosts -= budget.level;
      // TODO => moove to factory, nothing to do here
      financialFlows.push(aStateFinancialFlow()
        .withAmount(-budget.level)
        .withTurn(turn)
        .withColor(budget.definition.color)
        .withName(budget.definition.name)
        .withStateId(this.id)
        .build(),
      );
    }

    this.addToEconomicalSituation(totalBudgetsCosts);

    return financialFlows;
  }

  public generateRevenueFromSectors(sectors: Sector[]): number {
    let generatedRevenueFromSectors = 0;
    for (const sector of sectors) {
      const added = sectorEconomicalSituationMatchConfig[sector.ownershipType][sector.economicalSituation].state;
      generatedRevenueFromSectors += added;
    }

    this.addToEconomicalSituation(generatedRevenueFromSectors);

    return generatedRevenueFromSectors;
  }

  @beforeSave()
  public static async validateEconomicalSituationLevel(state: State) {
    if (state.economicalSituation < 0 || state.economicalSituation > 100) {
      throw new Error('Invalid economicalSituation level');
    }
  }

  public setFinancialFlows(financialFlows: StateFinancialFlow[]): void {
    this.$setRelated('financialFlows', financialFlows);
  }
}
