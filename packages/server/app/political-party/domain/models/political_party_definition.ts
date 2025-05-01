import { column, hasMany, hasOne, belongsTo } from '@adonisjs/lucid/orm';
import type { HasMany, HasOne, BelongsTo } from '@adonisjs/lucid/types/relations';
import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import LawVotesPercentagePerPoliticalAffiliation from '#law/domain/model/law_votes_percentage_per_political_affiliation';
import PoliticalParty from '#political-party/domain/models/political_party';
import { TimeStampedModel } from '#common/model/timestamped_model';
import GameDefinition from '#game/domain/models/game_definition';

export default class PoliticalPartyDefinition extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare color: string;

  @column()
  declare inPowerByDefault: boolean;

  @column()
  declare affiliation: PoliticalAffiliation;

  @column()
  declare licensedFileIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'licensedFileIdentifier',
  })
  declare licensedFile: HasOne<typeof LicensedFile>;

  @hasMany(() => LawVotesPercentagePerPoliticalAffiliation)
  declare percentageOfVotesForLaw: HasMany<typeof LawVotesPercentagePerPoliticalAffiliation>;

  @hasMany(() => PoliticalParty, {
    foreignKey: 'definitionId',
  })
  declare politicalParties: HasMany<typeof PoliticalParty>;

  @column()
  declare gameDefinitionIdentifier: string;

  @column()
  declare gameDefinitionIdentifier: string;

  @belongsTo(() => GameDefinition)
  declare gameDefinition: BelongsTo<typeof GameDefinition>;
}
