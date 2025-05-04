import { column, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';
import { TimeStampedModel } from '#common/model/timestamped_model';
import GameDefinition from '#game/domain/models/game_definition';

export default class PoliticalPartySeatsSenateDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare defaultNumberOfSeats: number;

  @column()
  declare politicalPartyAffiliation: PoliticalAffiliation;

  @hasMany(() => PoliticalPartySeatsSenate, {
    foreignKey: 'definitionId',
  })
  declare politicalPartySeatsSenate: HasMany<typeof PoliticalPartySeatsSenate>;

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
