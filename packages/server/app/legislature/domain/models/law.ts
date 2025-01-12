import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Game from '#game/domain/models/game';
import LawGroup from '#legislature/domain/models/law_group';
import type LawVotesPercentagePerPoliticalParty from '#legislature/domain/models/law_votes_percentage_per_political_party';

export default class Law extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare lawGroupId: number;

  @belongsTo(() => LawGroup)
  declare lawGroup: BelongsTo<typeof LawGroup>;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare voted: boolean;

  @column()
  declare order: number;

  /*
    * allowed myself to use a json, this field won't be edited and just contains "config"
    * i would have preferred use a join table but not possible here (table law doesn't exist)
    * still not a good idea however to use a json field
   */
  @column({ prepare: value => JSON.stringify(value) })
  declare votesPercentagePerPoliticalParties: LawVotesPercentagePerPoliticalParty[];

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
