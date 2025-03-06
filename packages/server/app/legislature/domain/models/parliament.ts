import { beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import ParliamentPartySeats from '#legislature/domain/models/political_party_seats_parliament';
import { TimeStampedModel } from '#common/model/timestamped_model';
import ParliamentDefinition from '#legislature/domain/models/parliament_definition';

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

  @belongsTo(() => ParliamentDefinition)
  declare definition: BelongsTo<typeof ParliamentDefinition>;

  @beforeSave()
  public static async validateSeatsCount(parliament: Parliament) {
    if (!parliament.id) {
      return;
    }

    const definition = await ParliamentDefinition.find(parliament.definitionId);
    if (!definition) {
      throw new Error(`Parliament definition with ID ${parliament.definitionId} not found`);
    }

    const partySeats = await ParliamentPartySeats.query()
      .where('parliamentId', parliament.id)
      .exec();

    const totalPartySeats = partySeats.reduce(
      (total, seat) => total + seat.numberOfSeats,
      0,
    );

    if (totalPartySeats !== definition.numberOfSeats) {
      throw new Error(
        `Total party seats (${totalPartySeats}) does not match parliament definition seats (${definition.numberOfSeats})`,
      );
    }
  }
}
