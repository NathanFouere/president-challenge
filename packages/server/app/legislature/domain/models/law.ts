import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawGroup from '#legislature/domain/models/law_group';

export default class Law extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare lawGroupId: number;

  @belongsTo(() => LawGroup)
  declare lawGroup: BelongsTo<typeof LawGroup>;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare voted: boolean;

  @column()
  declare order: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
