import { belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Election from '#election/domain/model/election';
import PoliticalParty from '#political-party/domain/models/political_party';

export default class VotesForPoliticalPartyInElection extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare votes: number;

  @column()
  declare electionId: number;

  @belongsTo(() => Election)
  declare election: BelongsTo<typeof Election>;

  @column()
  declare politicalPartyId: number;

  @hasOne(() => PoliticalParty)
  declare politicalParty: HasOne<typeof PoliticalParty>;
}
