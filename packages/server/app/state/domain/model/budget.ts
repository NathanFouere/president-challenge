import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import State from '#state/domain/model/state';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import LicensedFile from '#licensed-file/domain/models/licensed_file';

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
  declare baseCost: number;

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

  public getCost(): number {
    return this.baseCost * this.level;
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
