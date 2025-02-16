import { column, belongsTo, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import LawVoteResults from '#law/domain/model/law_vote_results';
import { LegislatureType } from '#legislature/domain/models/legislature_type';
import Law from '#law/domain/model/law';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class LawVote extends TimeStampedModel {
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
