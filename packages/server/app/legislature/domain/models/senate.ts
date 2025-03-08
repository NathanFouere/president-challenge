import { beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import SenatePartySeats from '#legislature/domain/models/political_party_seats_senate';
import { TimeStampedModel } from '#common/model/timestamped_model';
import SenateDefinition from '#legislature/domain/models/senate_definition';
import type Election from '#election/domain/model/election';

export default class Senate extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => SenatePartySeats)
  declare partySeats: HasMany<typeof SenatePartySeats>;

  @column()
  declare definitionId: number;

  @belongsTo(() => SenateDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof SenateDefinition>;

  @beforeSave()
  public static async validateSeatsCount(senate: Senate) {
    if (!senate.id) {
      return;
    }

    await senate.load('definition');
    await senate.load('partySeats');

    const totalPartySeats = senate.partySeats.reduce(
      (total, seat) => total + seat.numberOfSeats,
      0,
    );

    if (totalPartySeats !== senate.definition.numberOfSeats) {
      throw new Error(
        `Total party seats (${totalPartySeats}) does not match senate definition seats (${senate.definition.numberOfSeats})`,
      );
    }
  }

  public applyElectionEffects(election: Election) {
    const totalVotes = election.votesForPoliticalPartyInElection.reduce(
      (total, voteForPoliticalPartyInElection) => total + voteForPoliticalPartyInElection.votes,
      0,
    );
    for (const voteForPoliticalPartyInElection of election.votesForPoliticalPartyInElection) {
      const partySeats = this.partySeats.find(
        (partySeat: SenatePartySeats) => partySeat.politicalPartyId === voteForPoliticalPartyInElection.politicalPartyId,
      );

      if (!partySeats) {
        throw new Error(`Party seats not found for political party with ID ${voteForPoliticalPartyInElection.politicalPartyId}`);
      }

      partySeats.numberOfSeats += Math.round(
        (voteForPoliticalPartyInElection.votes / totalVotes) * this.definition.numberOfSeats,
      );
    }
  }
}
