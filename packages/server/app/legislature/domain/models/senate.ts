import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import SenatePartySeats from '#legislature/domain/models/political_party_seats_senate';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class Senate extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => SenatePartySeats)
  declare partySeats: HasMany<typeof SenatePartySeats>;
}
