import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import Law from '#legislature/domain/models/law';
import LawVoteResults from '#legislature/domain/models/law_vote_results';
import { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class LawVote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number;

  @column()
  declare votePassed: boolean;

  @column()
  declare lawId: number;

  @belongsTo(() => Law)
  declare law: BelongsTo<typeof Law>;

  @hasOne(() => LawVoteResults, {
    onQuery: query => query.where('legislature_type', LegislatureType.SENATE),
  })
  declare voteResultsInSenate: HasOne<typeof LawVoteResults>;

  @hasOne(() => LawVoteResults, {
    onQuery: query => query.where('legislature_type', LegislatureType.PARLIAMENT),
  })
  declare voteResultsInParliament: HasOne<typeof LawVoteResults>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public setVoteResultsInSenate(voteResultsInSenate: LawVoteResults) {
    this.$setRelated('voteResultsInSenate', voteResultsInSenate);
  }

  public setVoteResultsInParliament(voteResultsInParliament: LawVoteResults) {
    this.$setRelated('voteResultsInParliament', voteResultsInParliament);
  }

  public processVotePassed() {
    let votesForInParliament = 0;
    let votesAgainstInParliament = 0;
    this.voteResultsInParliament.politicalPartiesVoteResults.forEach((politicalPartyVoteResults) => {
      votesForInParliament += politicalPartyVoteResults.votesFor;
      votesAgainstInParliament += politicalPartyVoteResults.votesAgainst;
    });

    const lawPassedInParliament = votesForInParliament > votesAgainstInParliament;

    let votesForInSenate = 0;
    let votesAgainstInSenate = 0;

    this.voteResultsInSenate.politicalPartiesVoteResults.forEach((politicalPartyVoteResults) => {
      votesForInSenate += politicalPartyVoteResults.votesFor;
      votesAgainstInSenate += politicalPartyVoteResults.votesAgainst;
    });

    const lawPassedInSenate = votesForInSenate > votesAgainstInSenate;

    this.votePassed = lawPassedInParliament && lawPassedInSenate;
  }
}
