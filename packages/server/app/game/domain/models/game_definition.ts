import { column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';

export default class GameDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare maxTurns: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @hasMany(() => Game, {
    foreignKey: 'definitionIdentifier',
  })
  declare games: HasMany<typeof Game>;

  @column()
  declare defaultPoliticalWeight: number;

  @column()
  declare logoIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'logoIdentifier',
  })
  declare logo: HasOne<typeof LicensedFile>;
}
