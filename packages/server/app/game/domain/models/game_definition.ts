import { column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Game from '#game/domain/models/game';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import { ElectionType } from '#election/domain/model/election_type';

export default class GameDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare identifier: string;

  @column()
  declare maxTurns: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @hasMany(() => Game, {
    foreignKey: 'definitionIdentifier',
  })
  declare games: HasMany<typeof Game>;

  @column()
  declare defaultPoliticalWeight: number;

  @column()
  declare logoIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'logoIdentifier',
  })
  declare logo: HasOne<typeof LicensedFile>;

  @column({
    consume: value => (Array.isArray(value) ? value.map(Number) : []),
    prepare: (value: number[]) => value,
  })
  declare parliamentaryElectionTurns: number[];

  @column({
    consume: value => (Array.isArray(value) ? value.map(Number) : []),
    prepare: (value: number[]) => value,
  })
  declare senatorialElectionTurns: number[];

  @column({
    consume: value => (Array.isArray(value) ? value.map(Number) : []),
    prepare: (value: number[]) => value,
  })
  declare presidentialElectionTurns: number[];

  public getElectionTypeForTurn(turn: number): ElectionType | null {
    if (this.parliamentaryElectionTurns.includes(turn)) {
      return ElectionType.PARLIAMENTARY;
    }
    else if (this.senatorialElectionTurns.includes(turn)) {
      return ElectionType.SENATORIAL;
    }
    else if (this.presidentialElectionTurns.includes(turn)) {
      return ElectionType.PRESIDENTIAL;
    }

    return null;
  }
}
