import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawDefinition from '#law/domain/model/law_definition';
import LawVote from '#law/domain/model/law_vote';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class Law extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare voted: boolean;

  @column()
  declare definitionId: number;

  @belongsTo(() => LawDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof LawDefinition>;

  @hasMany(() => LawVote)
  declare votes: HasMany<typeof LawVote>;

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
