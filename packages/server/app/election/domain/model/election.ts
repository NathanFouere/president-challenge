import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import type { ElectionType } from '#election/domain/model/election_type';
import VotesForPoliticalPartyInElection from '#election/domain/model/votes_for_political_party_in_election';
import Game from '#game/domain/models/game';

export default class Election extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number;

  @column()
  declare type: ElectionType;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => VotesForPoliticalPartyInElection)
  declare socialClassVotes: HasMany<typeof VotesForPoliticalPartyInElection>;
}
