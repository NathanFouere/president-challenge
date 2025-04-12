import { column, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations';
import { TimeStampedModel } from '#common/model/timestamped_model';
import Game from '#game/domain/models/game';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';
import EventDefinition from '#event/domain/models/event_definition';
import SenateDefinition from '#legislature/domain/models/senate_definition';
import StateDefinition from '#state/domain/model/state_definition';
import LicensedFile from '#licensed-file/domain/models/licensed_file';

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

  @hasMany(() => PoliticalPartyDefinition, {
    foreignKey: 'gameDefinitionIdentifier',
  })
  declare politicalPartyDefinitions: HasMany<typeof PoliticalPartyDefinition>;

  @hasOne(() => EventDefinition, {
    foreignKey: 'gameDefinitionIdentifier',
  })
  declare eventDefinitions: HasOne<typeof EventDefinition>;

  @hasOne(() => SenateDefinition, {
    foreignKey: 'gameDefinitionIdentifier',
  })
  declare senateDefinition: HasOne<typeof SenateDefinition>;

  @hasOne(() => StateDefinition, {
    foreignKey: 'gameDefinitionIdentifier',
  })
  declare stateDefinition: HasOne<typeof StateDefinition>;

  @column()
  declare defaultPoliticalWeight: number;

  @column()
  declare logoIdentifier: string;

  @hasOne(() => LicensedFile, {
    foreignKey: 'identifier',
    localKey: 'logoIdentifier',
  })
  declare logo: HasOne<typeof LicensedFile>;
}
