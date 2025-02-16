import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import ParliamentPartySeats from '#legislature/domain/models/political_party_seats_parliament';
import { TimeStampedModel } from '#common/model/timestamped_model';

export class Parliament extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({})
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => ParliamentPartySeats)
  declare partySeats: HasMany<typeof ParliamentPartySeats>;
}
