import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Event extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare identifier: number;

  @column()
  declare title: string;

  @column()
  declare text: string;

  @column()
  declare turn: number;
}
