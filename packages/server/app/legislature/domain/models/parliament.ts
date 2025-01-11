import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import ParliamentPartySeats from '#legislature/domain/models/political_party_seats_parliament';

export class Parliament extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({})
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => ParliamentPartySeats)
  declare partySeats: HasMany<typeof ParliamentPartySeats>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
