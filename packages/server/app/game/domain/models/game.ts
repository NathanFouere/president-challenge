import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import User from '#user/domain/models/user';
import PoliticalParty from '#political-party/domain/models/political_party';
import Event from '#event/domain/models/event';
import Senate from '#legislature/domain/models/senate';
import State from '#state/domain/model/state';

export default class Game extends BaseModel {
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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;

  public changeTurn() {
    this.turn += 1;
  }
}
