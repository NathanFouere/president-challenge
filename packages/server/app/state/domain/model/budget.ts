import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import State from '#state/domain/model/state';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import BudgetLevelPerTurn from '#state/domain/model/budget_level_per_turn';

export default class Budget extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare color: string;

  @column()
  declare description: string;

  @column()
  declare level: BudgetLevel;

  @column()
  declare stateId: number;

  @column()
  declare licensedFileIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;

  @hasMany(() => BudgetLevelPerTurn)
  declare levelPerTurn: HasMany<typeof BudgetLevelPerTurn>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
