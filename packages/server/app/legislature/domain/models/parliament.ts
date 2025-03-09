import { beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import ParliamentPartySeats from '#legislature/domain/models/political_party_seats_parliament';
import { TimeStampedModel } from '#common/model/timestamped_model';
import ParliamentDefinition from '#legislature/domain/models/parliament_definition';
import type Election from '#election/domain/model/election';

export class Parliament extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({})
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => ParliamentPartySeats)
  declare partySeats: HasMany<typeof ParliamentPartySeats>;

  @column()
  declare definitionId: number;

  @belongsTo(() => ParliamentDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof ParliamentDefinition>;

  @beforeSave()
  public static async validateSeatsCount(parliament: Parliament) {
    if (!parliament.id) {
      return;
    }

    await parliament.load('definition');
    await parliament.load('partySeats');
    const totalPartySeats = parliament.partySeats.reduce(
      (total, seat) => total + seat.numberOfSeats,
      0,
    );

    if (totalPartySeats !== parliament.definition.numberOfSeats) {
      throw new Error(
        `Total party seats (${totalPartySeats}) does not match parliament definition seats (${parliament.definition.numberOfSeats})`,
      );
    }
  }

  public applyElectionEffects(election: Election) {
    let totalVotes = 0;
    for (const voteForPoliticalPartyInElection of election.votesForPoliticalParties) {
      totalVotes += voteForPoliticalPartyInElection.votes;
      const partySeats = this.partySeats.find(
        (partySeat: ParliamentPartySeats) => partySeat.politicalPartyId === voteForPoliticalPartyInElection.politicalPartyId,
      );

      if (!partySeats) {
        throw new Error(
          `Party seats for political party with ID ${voteForPoliticalPartyInElection.politicalPartyId} not found`,
        );
      }

      partySeats.numberOfSeats = Math.round(
        (voteForPoliticalPartyInElection.votes / totalVotes) * this.definition.numberOfSeats,
      );
    }
  }
}
