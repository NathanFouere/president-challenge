import { beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import SenatePartySeats from '#legislature/domain/models/political_party_seats_senate';
import { TimeStampedModel } from '#common/model/timestamped_model';
import SenateDefinition from '#legislature/domain/models/senate_definition';

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

  @belongsTo(() => SenateDefinition)
  declare definition: BelongsTo<typeof SenateDefinition>;

  @beforeSave()
  public static async validateSeatsCount(senate: Senate) {
    if (!senate.id) {
      return;
    }

    const definition = await SenateDefinition.find(senate.definitionId);
    if (!definition) {
      throw new Error(`Senate definition with ID ${senate.definitionId} not found`);
    }

    const partySeats = await SenatePartySeats.query()
      .where('senateId', senate.id)
      .exec();

    const totalPartySeats = partySeats.reduce(
      (total, seat) => total + seat.numberOfSeats,
      0,
    );

    if (totalPartySeats !== definition.numberOfSeats) {
      throw new Error(
        `Total party seats (${totalPartySeats}) does not match senate definition seats (${definition.numberOfSeats})`,
      );
    }
  }
}
