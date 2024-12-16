import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import Event from '#event/domain/models/event';
import SocialClass from '#social-class/domain/models/social_class';

export default class LicensedFile extends BaseModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare title: string;

  @column()
  declare attribution: string | null;

  @column()
  declare source: string | null;

  @column()
  declare license: string | null;

  @column()
  declare date: string | null;

  @column()
  declare path: string;

  @column()
  declare isVideo: boolean;

  @manyToMany(() => Event, {
    pivotTable: 'event_licensed_file',
    pivotForeignKey: 'licensed_file_identifier',
    pivotRelatedForeignKey: 'event_id',
    localKey: 'identifier',
    relatedKey: 'id',
  })
  declare events: ManyToMany<typeof Event>;

  @manyToMany(() => SocialClass, {
    pivotTable: 'social_class_licensed_files',
    pivotForeignKey: 'licensed_file_identifier',
    pivotRelatedForeignKey: 'social_clas_id',
    localKey: 'identifier',
    relatedKey: 'id',
  })
  declare socialClasses: ManyToMany<typeof SocialClass>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
