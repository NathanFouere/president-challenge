import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import User from '#user/domain/models/user';
import PoliticalParty from '#political-party/domain/models/political_party';
import Event from '#event/domain/models/event';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turnNumber: number;

  @column({ serializeAs: null })
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @hasMany(() => PoliticalParty)
  declare politicalParties: HasMany<typeof PoliticalParty>;

  @hasMany(() => Event)
  declare events: HasMany<typeof Event>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null;
}
