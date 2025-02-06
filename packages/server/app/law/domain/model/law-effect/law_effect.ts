import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import Law from '#law/domain/model/law';

export default abstract class LawEffect extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare lawId: number;

  @belongsTo(() => Law)
  declare law: BelongsTo<typeof Law>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public abstract apply(): void;
}
