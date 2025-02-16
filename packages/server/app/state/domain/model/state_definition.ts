import { column, hasOne, hasMany } from '@adonisjs/lucid/orm';
import type { HasOne, HasMany } from '@adonisjs/lucid/types/relations';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import TaxDefinition from '#tax/domain/model/tax_definition';
import BudgetDefinition from '#budget/domain/model/budget_definition';
import State from '#state/domain/model/state';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class StateDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare defaultEconomicalSituation: number;

  @column()
  declare flagIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'flagIdentifier',
  })
  declare flag: HasOne<typeof LicensedFile>;

  @hasMany(() => BudgetDefinition)
  declare budgetDefinitions: HasMany<typeof BudgetDefinition>;

  @hasMany(() => TaxDefinition)
  declare taxesDefinitions: HasMany<typeof TaxDefinition>;

  @hasMany(() => State)
  declare states: HasMany<typeof State>;
}
