import { column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import { Parliament } from '#legislature/domain/models/parliament';

export default class ParliamentDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @hasMany(() => Parliament)
  declare parliaments: HasMany<typeof Parliament>;
}
