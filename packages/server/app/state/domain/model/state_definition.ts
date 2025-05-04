import { column, hasOne, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { HasOne, HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import TaxDefinition from '#tax/domain/model/tax_definition';
import BudgetDefinition from '#budget/domain/model/budget_definition';
import State from '#state/domain/model/state';
import { TimeStampedModel } from '#common/model/timestamped_model';
import GameDefinition from '#game/domain/models/game_definition';

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

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
