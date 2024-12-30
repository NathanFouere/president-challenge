import { BaseModel, belongsTo, column, hasOne, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import type { StateEconomicalSituation } from '@shared/dist/state/state-economical-situation.js';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import StateEconomicalSituationPerTurn from '#state/domain/model/state_economical_situation_per_turn';

export default class State extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare economicalSituation: StateEconomicalSituation;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare flagIdentifier: string;

  @hasMany(() => StateEconomicalSituationPerTurn)
  declare economicalSituationPerTurn: HasMany<typeof StateEconomicalSituationPerTurn>;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'flagIdentifier',
  })
  declare flag: HasOne<typeof LicensedFile>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
