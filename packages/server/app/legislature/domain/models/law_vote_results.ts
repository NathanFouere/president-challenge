import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';
import Law from '#legislature/domain/models/law';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class LawVoteResults extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number;

  @column()
  declare legislatureType: LegislatureType;

  @column()
  declare lawId: number;

  @belongsTo(() => Law)
  declare law: BelongsTo<typeof Law>;

  @hasMany(() => PoliticalPartyVoteForLaw)
  declare politicalPartiesVoteResults: HasMany<typeof PoliticalPartyVoteForLaw>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public votePasses(): boolean {
    return this.politicalPartiesVoteResults.every((politicalPartyVoteResults) => {
      return politicalPartyVoteResults.votesFor > politicalPartyVoteResults.votesAgainst;
    });
  }
}
