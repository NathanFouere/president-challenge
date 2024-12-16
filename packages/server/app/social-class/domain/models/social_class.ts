import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { SocialClassTypes } from '@shared/types/dist/types/social-class/social-class-types.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';

export default class SocialClass extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare color: string;

  @column()
  declare wealthLevel: number;

  @column()
  declare socialClassType: SocialClassTypes;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @manyToMany(() => LicensedFile, {
    pivotTable: 'social_class_licensed_files',
    pivotForeignKey: 'social_class_id',
    pivotRelatedForeignKey: 'licensed_file_identifier',
    localKey: 'id',
    relatedKey: 'identifier',
  })
  declare licensedFiles: ManyToMany<typeof LicensedFile>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
