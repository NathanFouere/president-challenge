import { belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';
import PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';
import type LawVotesPercentagePerPoliticalAffiliation from '#law/domain/model/law_votes_percentage_per_political_affiliation';
import { LegislatureType } from '#legislature/domain/models/legislature_type';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';
import PoliticalPartyHappinessPerTurn from '#political-party/domain/models/political_party_happiness_per_turn';
import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class PoliticalParty extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare gameId: number;

  @column()
  declare inPower: boolean;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasOne(() => PoliticalPartySeatsSenate)
  declare senateSeats: HasOne<typeof PoliticalPartySeatsSenate>;

  @hasOne(() => PoliticalPartySeatsParliament)
  declare parliamentSeats: HasOne<typeof PoliticalPartySeatsParliament>;

  @hasMany(() => PoliticalPartyHappinessModifier)
  declare happinessModifiers: HasMany<typeof PoliticalPartyHappinessModifier>;

  @hasMany(() => PoliticalPartyHappinessPerTurn)
  declare happinessPerTurn: HasMany<typeof PoliticalPartyHappinessPerTurn>;

  @column()
  declare definitionId: number;

  @belongsTo(() => PoliticalPartyDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof PoliticalPartyDefinition>;

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

  public getVotesInFavorOfLaw(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalAffiliation, legislatureType: LegislatureType): number {
    let votesInFavorOfLaw: number;
    if (legislatureType === LegislatureType.PARLIAMENT) {
      votesInFavorOfLaw = this.parliamentSeats.numberOfSeats * (lawVotesPercentagePerPoliticalParty.percentage / 100);
    }
    else {
      votesInFavorOfLaw = this.senateSeats.numberOfSeats * (lawVotesPercentagePerPoliticalParty.percentage / 100);
    }

    return Math.round(votesInFavorOfLaw);
  }

  public getVotesAgainstLaw(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalAffiliation, legislatureType: LegislatureType): number {
    let votesAgainstLaw: number;
    if (legislatureType === LegislatureType.PARLIAMENT) {
      votesAgainstLaw = this.parliamentSeats.numberOfSeats * ((100 - lawVotesPercentagePerPoliticalParty.percentage) / 100);
    }
    else {
      votesAgainstLaw = this.senateSeats.numberOfSeats * ((100 - lawVotesPercentagePerPoliticalParty.percentage) / 100);
    }

    return Math.round(votesAgainstLaw);
  }
}
