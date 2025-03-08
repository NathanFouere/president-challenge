import { column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Senate from '#legislature/domain/models/senate';

export default class SenateDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @hasMany(() => Senate)
  declare senates: HasMany<typeof Senate>;
}
