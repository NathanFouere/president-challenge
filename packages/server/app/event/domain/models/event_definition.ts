import { column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { EventType } from '#event/domain/models/event_type';
import Choice from '#event/domain/models/choice';
import Event from '#event/domain/models/event';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class EventDefinition extends TimeStampedModel {
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
  declare turn: number | null;

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
}
