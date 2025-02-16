import { column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import SocialClass from '#social-class/domain/models/social_class';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class SocialClassDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare defaultEconomicalSituation: number;

  @column()
  declare color: string;

  @hasMany(() => SocialClass, {
    foreignKey: 'definitionId',
  })
  declare socialClasses: HasMany<typeof SocialClass>;

  @column()
  declare type: SocialClassTypes;

  @column()
  declare subType: SocialClassSubtypes;

  @manyToMany(() => LicensedFile, {
    pivotTable: 'social_class_definition_licensed_files',
    pivotForeignKey: 'social_class_definition_id',
    pivotRelatedForeignKey: 'licensed_file_identifier',
    localKey: 'id',
    relatedKey: 'identifier',
  })
  declare licensedFiles: ManyToMany<typeof LicensedFile>;

  @column()
  declare sectorType: SectorTypes;
}
