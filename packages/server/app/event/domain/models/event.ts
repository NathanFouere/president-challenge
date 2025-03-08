import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import EventDefinition from '#event/domain/models/event_definition';
import Choice from '#event/domain/models/choice';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Election from '#election/domain/model/election';

export default class Event extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number | null;

  @column()
  declare isAvailable: boolean;

  @column()
  declare beenRead: boolean;

  @column()
  declare isDisplayable: boolean;

  @column()
  declare definitionId: number;

  @belongsTo(() => EventDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof EventDefinition>;

  @column({ serializeAs: null })
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => Choice)
  declare choices: HasMany<typeof Choice>;

  @column()
  declare electionId: number | null;

  @belongsTo(() => Election)
  declare election: BelongsTo<typeof Election>;

  public makeAvailable(): void {
    this.isAvailable = true;
    this.isDisplayable = true;
  }

  public makeUnavailable(): void {
    this.isAvailable = false;
  }
}
