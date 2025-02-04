import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { DateTime } from 'luxon';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';
import PoliticalPartyHappinessPerTurn from '#political-party/domain/models/political_party_happiness_per_turn';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';
import LawVotesPercentagePerPoliticalParty from '#law/domain/model/law_votes_percentage_per_political_party';
import { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class PoliticalParty extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare color: string;

  @column()
  declare affiliation: PoliticalAffiliation;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare licensedFileIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @hasOne(() => PoliticalPartySeatsSenate)
  declare senateSeats: HasOne<typeof PoliticalPartySeatsSenate>;

  @hasOne(() => PoliticalPartySeatsParliament)
  declare parliamentSeats: HasOne<typeof PoliticalPartySeatsParliament>;

  @hasMany(() => PoliticalPartyHappinessPerTurn)
  declare happinessPerTurn: HasMany<typeof PoliticalPartyHappinessPerTurn>;

  @hasMany(() => LawVotesPercentagePerPoliticalParty)
  declare percentageOfVotesForLaw: HasMany<typeof LawVotesPercentagePerPoliticalParty>;

  @hasMany(() => PoliticalPartyHappinessModifier)
  declare happinessModifiers: HasMany<typeof PoliticalPartyHappinessModifier>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public getHappinessLevel(): number {
    const happinessLevel = this.happinessModifiers.reduce((acc, happinessModifier) => acc + happinessModifier.amount, 0);
    if (happinessLevel < 0) {
      return 0;
    }
    if (happinessLevel > 5) {
      return 5;
    }
    return happinessLevel;
  }

  public getVotesInFavorOfLaw(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, legislatureType: LegislatureType): number {
    let votesInFavorOfLaw = 0;
    if (legislatureType === LegislatureType.PARLIAMENT) {
      votesInFavorOfLaw = this.parliamentSeats.numberOfSeats * (lawVotesPercentagePerPoliticalParty.percentage / 100);
    }
    else {
      votesInFavorOfLaw = this.senateSeats.numberOfSeats * (lawVotesPercentagePerPoliticalParty.percentage / 100);
    }

    return Math.round(votesInFavorOfLaw);
  }

  public getVotesAgainstLaw(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, legislatureType: LegislatureType): number {
    let votesAgainstLaw = 0;
    if (legislatureType === LegislatureType.PARLIAMENT) {
      votesAgainstLaw = this.parliamentSeats.numberOfSeats * ((100 - lawVotesPercentagePerPoliticalParty.percentage) / 100);
    }
    else {
      votesAgainstLaw = this.senateSeats.numberOfSeats * ((100 - lawVotesPercentagePerPoliticalParty.percentage) / 100);
    }

    return Math.round(votesAgainstLaw);
  }
}
