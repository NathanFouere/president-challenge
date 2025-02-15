import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import { ChoiceStatus } from '@shared/dist/event/choice-status.js';
import type { DateTime } from 'luxon';
import ChoiceDefinition from '#event/domain/models/choice_definition';
import Game from '#game/domain/models/game';
import Event from '#event/domain/models/event';

export default class Choice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  public status: ChoiceStatus = ChoiceStatus.Available;

  @column()
  declare definitionId: number;

  @belongsTo(() => ChoiceDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof ChoiceDefinition>;

  @column()
  declare eventId: number;

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare triggerEventId: number | null;

  @hasOne(() => Event, {
    localKey: 'triggerEventId',
    foreignKey: 'id',
  })
  declare triggerEvent: HasOne<typeof Event>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
