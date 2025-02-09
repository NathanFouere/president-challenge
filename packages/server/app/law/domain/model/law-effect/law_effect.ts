import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import Law from '#law/domain/model/law';
import type { LawEffectType } from '#law/domain/model/law-effect/law_effect_type';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export default class LawEffect extends BaseModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare type: LawEffectType;

  @column()
  declare budgetTypeToChange?: BudgetType;

  @column()
  declare budgetLevelToChange?: BudgetLevel;

  @column()
  declare sectorTypeToChange?: SectorTypes;

  @column()
  declare sectorOwnershipTypeToChange?: SectorOwnershipType;

  @column()
  declare taxTypeToChange?: TaxType;

  @column()
  declare taxLevelToChange?: TaxLevel;

  @hasMany(() => Law)
  declare laws: HasMany<typeof Law>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
