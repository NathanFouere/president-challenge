import { beforeSave, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import { GameStatus } from '@shared/dist/game/game_status.js';
import { GameDefeatSource } from '@shared/dist/game/game-defeat-source.js';
import User from '#user/domain/models/user';
import PoliticalParty from '#political-party/domain/models/political_party';
import Event from '#event/domain/models/event';
import Senate from '#legislature/domain/models/senate';
import State from '#state/domain/model/state';
import { TimeStampedModel } from '#common/model/timestamped_model';
import GameMaxTurnError from '#game/domain/error/game_max_turn_error';
import GameInDefeatStatusError from '#game/domain/error/game_in_defeat_status_error';
import GameInFinishedStatusError from '#game/domain/error/game_in_finished_status_error';

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

  @column()
  declare defeatSource: GameDefeatSource;

  public changeTurn() {
    this.checkCanChangeTurn();
    this.turn += 1;
    this.politicalWeight += 5;
    if (this.turn >= this.maxTurns) {
      this.status = GameStatus.Finished;
    }
  }

  public setDefeatFromPopularUprising() {
    this.status = GameStatus.Defeated;
    this.defeatSource = GameDefeatSource.POPULAR_UPRISING;
  }

  public setDefeatFromRevolution() {
    this.status = GameStatus.Defeated;
    this.defeatSource = GameDefeatSource.REVOLUTION;
  }

  public setDefeatFromLosePresidentialElection() {
    this.status = GameStatus.Defeated;
    this.defeatSource = GameDefeatSource.LOSE_PRESIDENTIAL_ELECTION;
  }

  public isInDefeatStatus(): boolean {
    return this.status == GameStatus.Defeated;
  }

  public isInFinishedStatus(): boolean {
    return this.status == GameStatus.Finished;
  }

  private checkCanChangeTurn() {
    if (this.hasReachedMaxTurns()) {
      throw new GameMaxTurnError(this.id, this.turn);
    }
    if (this.status == GameStatus.Defeated) {
      throw new GameInDefeatStatusError(this.id);
    }
    if (this.status == GameStatus.Finished) {
      throw new GameInFinishedStatusError(this.id);
    }
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

    this.setPoliticalWeight(updatedPoliticalWeight);
  }

  @beforeSave()
  public static async validatePrice(game: Game) {
    if (game.politicalWeight < 0) {
      throw new Error('Invalid political weight');
    }
  }
}
