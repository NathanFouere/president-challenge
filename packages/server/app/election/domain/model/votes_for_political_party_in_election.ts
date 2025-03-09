import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
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

  @belongsTo(() => PoliticalParty)
  declare politicalParty: BelongsTo<typeof PoliticalParty>;

  public setPoliticalParty(politicalParty: PoliticalParty): void {
    this.politicalPartyId = politicalParty.id;
    this.$setRelated('politicalParty', politicalParty);
  }

  public setElection(election: Election): void {
    this.electionId = election.id;
    this.$setRelated('election', election);
  }
}
