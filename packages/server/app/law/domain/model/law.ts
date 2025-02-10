import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawGroup from '#law/domain/model/law_group';
import LawVotesPercentagePerPoliticalParty from '#law/domain/model/law_votes_percentage_per_political_party';
import LawVote from '#law/domain/model/law_vote';
import type { LawType } from '#law/domain/model/law_type';
import LawEffect from '#law/domain/model/law-effect/law_effect';

export default class Law extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare lawGroupId: number;

  @belongsTo(() => LawGroup)
  declare lawGroup: BelongsTo<typeof LawGroup>;

  @column()
  declare type: LawType;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare politicalWeightRequired: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare voted: boolean;

  @column()
  declare order: number;

  @column()
  declare lawEffectIdentifier: string;

  @belongsTo(() => LawEffect)
  declare lawEffect: BelongsTo<typeof LawEffect>;

  @hasMany(() => LawVotesPercentagePerPoliticalParty)
  declare percentagesOfVotesForPoliticalParty: HasMany<typeof LawVotesPercentagePerPoliticalParty>;

  @hasMany(() => LawVote)
  declare lawVotes: HasMany<typeof LawVote>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public setVoted(): void {
    this.voted = true;
  }

  public setUnvoted(): void {
    this.voted = false;
  }

  public isVoted(): boolean {
    return this.voted;
  }
}
