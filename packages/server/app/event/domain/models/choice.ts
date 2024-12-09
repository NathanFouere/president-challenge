import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Choice extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare text: string;
}
