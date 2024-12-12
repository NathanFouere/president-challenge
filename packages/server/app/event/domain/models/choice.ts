import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import type { ChoiceStatus } from '@shared/types/event/choice-status.js';
import Event from '#event/domain/models/event';

export default class Choice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare text: string;

  @column()
  declare eventId: number;

  @column()
  declare status: ChoiceStatus;

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>;

  @column()
  declare triggerEventId: number | null;

  @hasOne(() => Event, {
    localKey: 'triggerEventId',
    foreignKey: 'id',
  })
  declare triggerEvent: HasOne<typeof Event>;
}
