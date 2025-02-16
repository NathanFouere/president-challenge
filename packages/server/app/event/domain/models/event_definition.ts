import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { EventType } from '@shared/dist/event/event-type.js';
import Choice from '#event/domain/models/choice';
import Event from '#event/domain/models/event';
import LicensedFile from '#licensed-file/domain/models/licensed_file';

export default class EventDefinition extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare identifier: string;

  @column()
  declare type: EventType;

  @column()
  declare title: string;

  @column()
  declare text: string;

  @column()
  declare turn: number;

  @column()
  declare isAvailableByDefault: boolean;

  @column()
  declare isDisplayableByDefault: boolean;

  @manyToMany(() => LicensedFile, {
    pivotTable: 'event_definition_licensed_file',
    pivotForeignKey: 'event_definition_id',
    pivotRelatedForeignKey: 'licensed_file_identifier',
    localKey: 'id',
    relatedKey: 'identifier',
  })
  declare licensedFiles: ManyToMany<typeof LicensedFile>;

  @hasMany(() => Event, {
    foreignKey: 'definitionId',
  })
  declare events: HasMany<typeof Event>;

  @hasMany(() => Choice)
  declare choices: HasMany<typeof Choice>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
