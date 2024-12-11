import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { EventType } from '@shared/types/event/event-type.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';
import Choice from '#event/domain/models/choice';

export default class Event extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number;

  @column()
  declare identifier: string;

  @column()
  declare title: string;

  @column()
  declare text: string;

  @column()
  declare turn: number;

  @column()
  declare isAvailable: boolean;

  @column()
  declare isDisplayable: boolean;

  @column()
  declare type: EventType;

  @column()
  declare beenRead: boolean;

  @manyToMany(() => LicensedFile, {
    pivotTable: 'event_licensed_file',
    pivotForeignKey: 'event_id',
    pivotRelatedForeignKey: 'licensed_file_identifier',
    localKey: 'id',
    relatedKey: 'identifier',
  })
  declare licensedFiles: ManyToMany<typeof LicensedFile>;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => Choice)
  declare choices: HasMany<typeof Choice>;
}
