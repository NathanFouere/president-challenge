import { BaseModel, belongsTo, column, hasOne, hasMany, beforeSave } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Budget from '#state/domain/model/budget';
import StateEconomicalSituationPerTurn from '#state/domain/model/state_economical_situation_per_turn';
import Tax from '#tax/domain/model/tax';
import sectorEconomicalSituationMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';
import StateFinancialFlow from '#state/domain/model/state_financial_flow';
import type Sector from '#sector/domain/model/sector';

export default class State extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare economicalSituation: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare flagIdentifier: string;

  @hasMany(() => StateFinancialFlow)
  declare financialFlows: HasMany<typeof StateFinancialFlow>;

  @hasMany(() => StateEconomicalSituationPerTurn)
  declare economicalSituationPerTurn: HasMany<typeof StateEconomicalSituationPerTurn>;

  @hasMany(() => Budget)
  declare budgets: HasMany<typeof Budget>;

  @hasMany(() => Tax)
  declare taxes: HasMany<typeof Tax>;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'flagIdentifier',
  })
  declare flag: HasOne<typeof LicensedFile>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public addToEconomicalSituation(addedEconomicalSituation: number) {
    let newEconomicalSituation = this.economicalSituation + addedEconomicalSituation;
    if (newEconomicalSituation > 20) {
      newEconomicalSituation = 20;
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
      financialFlows.push(aStateFinancialFlow()
        .withAmount(-budget.level)
        .withTurn(turn)
        .withColor(budget.color)
        .withName(budget.name)
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
    if (state.economicalSituation < 0 || state.economicalSituation > 20) {
      throw new Error('Invalid economicalSituation level');
    }
  }
}
