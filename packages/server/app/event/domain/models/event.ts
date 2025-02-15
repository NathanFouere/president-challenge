import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import EventDefinition from '#event/domain/models/event_definition';
import Choice from '#event/domain/models/choice';

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number;

  @column()
  declare isAvailable: boolean;

  @column()
  declare definitionId: number;

  @column()
  declare beenRead: boolean;

  @column()
  declare isDisplayable: boolean;

  @belongsTo(() => EventDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof EventDefinition>;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => Choice)
  declare choices: HasMany<typeof Choice>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
