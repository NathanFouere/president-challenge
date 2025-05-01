import { column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Senate from '#legislature/domain/models/senate';
import GameDefinition from '#game/domain/models/game_definition';

export default class SenateDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare numberOfSeats: number;

  @hasMany(() => Senate)
  declare senates: HasMany<typeof Senate>;

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
