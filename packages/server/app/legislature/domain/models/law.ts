import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawGroup from '#legislature/domain/models/law_group';
import LawVotesPercentagePerPoliticalParty from '#legislature/domain/models/law_votes_percentage_per_political_party';
import LawVoteResults from '#legislature/domain/models/law_vote_results';

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

  @hasMany(() => LawVotesPercentagePerPoliticalParty)
  declare percentagesOfVotesForPoliticalParty: HasMany<typeof LawVotesPercentagePerPoliticalParty>;

  @hasMany(() => LawVoteResults)
  declare voteResults: HasMany<typeof LawVoteResults>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
