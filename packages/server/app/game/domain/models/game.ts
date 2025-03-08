import { belongsTo, column, hasMany, hasOne, beforeSave } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import type { GameStatus } from '@shared/dist/game/game_status.js';
import User from '#user/domain/models/user';
import PoliticalParty from '#political-party/domain/models/political_party';
import Event from '#event/domain/models/event';
import Senate from '#legislature/domain/models/senate';
import State from '#state/domain/model/state';
import { TimeStampedModel } from '#common/model/timestamped_model';
import GameMaxTurnError from '#game/domain/error/game_max_turn_error';

export default class Game extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number;

  @column({ serializeAs: null })
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @hasMany(() => PoliticalParty)
  declare politicalParties: HasMany<typeof PoliticalParty>;

  @hasMany(() => Event)
  declare events: HasMany<typeof Event>;

  @hasOne(() => Senate)
  declare senate: HasOne<typeof Senate>;

  @hasOne(() => State)
  declare state: HasOne<typeof State>;

  @column()
  declare politicalWeight: number;

  @column()
  declare maxTurns: number;

  @column()
  declare status: GameStatus;

  public changeTurn() {
    if (this.turn >= this.maxTurns) {
      throw new GameMaxTurnError(this.id, this.turn);
    }
    this.turn += 1;
    this.politicalWeight += 5;
  }

  public hasReachedMaxTurns(): boolean {
    return this.turn >= this.maxTurns;
  }

  public setPoliticalWeight(politicalWeight: number) {
    if (politicalWeight < 0) {
      throw new Error('Invalid political weight');
    }

    this.politicalWeight = politicalWeight;
  }

  public updatePoliticalWeight(politicalWeight: number) {
    const updatedPoliticalWeight = this.politicalWeight + politicalWeight;

    if (updatedPoliticalWeight < 0) {
      throw new Error('Invalid political weight');
    }

    this.politicalWeight = updatedPoliticalWeight;
  }

  @beforeSave()
  public static async validatePrice(game: Game) {
    if (game.politicalWeight < 0) {
      throw new Error('Invalid political weight');
    }
  }
}
