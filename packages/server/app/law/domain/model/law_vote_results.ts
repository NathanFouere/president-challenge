import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';
import LawVote from '#law/domain/model/law_vote';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class LawVoteResults extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare legislatureType: LegislatureType;

  @column()
  declare votePassed: boolean;

  @column()
  declare lawVoteId: number;

  @belongsTo(() => LawVote)
  declare lawVote: BelongsTo<typeof LawVote>;

  @hasMany(() => PoliticalPartyVoteForLaw)
  declare politicalPartiesVoteResults: HasMany<typeof PoliticalPartyVoteForLaw>;
}
