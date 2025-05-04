import { column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import { Parliament } from '#legislature/domain/models/parliament';
import GameDefinition from '#game/domain/models/game_definition';

export default class ParliamentDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @hasMany(() => Parliament)
  declare parliaments: HasMany<typeof Parliament>;

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
