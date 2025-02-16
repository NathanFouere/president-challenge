import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import PoliticalParty from '#political-party/domain/models/political_party';
import LawVoteResults from '#law/domain/model/law_vote_results';

export default class PoliticalPartyVoteForLaw extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare politicalPartyId: number;

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  @hasMany(() => LawVoteResults)
  declare politicalPartiesVoteResults: HasMany<typeof LawVoteResults>;

  @column()
  declare lawVoteResultsId: number;

  @belongsTo(() => LawVoteResults)
  declare lawVoteResults: BelongsTo<typeof LawVoteResults>;

  @column()
  declare votesFor: number;

  @column()
  declare votesAgainst: number;
}
