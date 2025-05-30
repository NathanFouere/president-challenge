import { column, hasMany, manyToMany, belongsTo } from '@adonisjs/lucid/orm';
import type { HasMany, ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import type { SectorTypes } from '@president-challenge/shared/dist/sector/sector-types.js';
import type { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';
import type { SocialClassSubtypes } from '@president-challenge/shared/dist/social-class/social-class-subtypes.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import SocialClass from '#social-class/domain/models/social_class';
import { TimeStampedModel } from '#common/model/timestamped_model';
import GameDefinition from '#game/domain/models/game_definition';

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

  @column()
  declare population: number;

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

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
