import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { SocialClassTypes } from '@shared/dist//types/social-class/social-class-types.js';
import type { HappinessLevels } from '@shared/dist//types/common/happiness-levels.js';
import type { WealthLevels } from '@shared/dist//types/social-class/wealth-levels.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';
import Sector from '#sector/domain/model/sector';

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
  declare wealthLevel: WealthLevels;

  @column()
  declare type: SocialClassTypes;

  @column()
  declare happinessLevel: HappinessLevels;

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

  @column()
  declare sectorId: number;

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
