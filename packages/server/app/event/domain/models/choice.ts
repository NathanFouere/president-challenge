import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Event from '#event/domain/models/event';

export default class Choice extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare text: string;

  @column()
  declare eventId: number;

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>;
}
