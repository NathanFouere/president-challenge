import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { BudgetLevel } from '#budget/domain/model/budget_level';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Budget from '#budget/domain/model/budget';
import type { BudgetType } from '#budget/domain/model/budget_type';

export default class BudgetDefinition extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare color: string;

  @column()
  declare description: string;

  @column()
  declare type: BudgetType;

  @column()
  declare defaultLevel: BudgetLevel;

  @column()
  declare licensedFileIdentifier: string;

  @hasMany(() => Budget)
  declare budgets: HasMany<typeof Budget>;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
