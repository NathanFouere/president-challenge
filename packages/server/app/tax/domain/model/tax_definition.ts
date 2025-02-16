import { column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import Tax from '#tax/domain/model/tax';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class TaxDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare defaultRate: number;

  @column()
  declare color: string;

  @column()
  declare type: TaxType;

  @column()
  declare defaultLevel: TaxLevel;

  @hasMany(() => Tax)
  declare taxes: HasMany<typeof Tax>;
}
