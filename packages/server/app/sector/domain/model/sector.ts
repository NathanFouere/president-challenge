import { beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { SectorEconomicalSituation } from '@shared/dist/sector/sector-economical-situation.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import Product from '#product/domain/models/product';
import SocialClass from '#social-class/domain/models/social_class';
import Game from '#game/domain/models/game';
import SectorEconomicalSituationPerTurn from '#sector/domain/model/sector_economical_situation_per_turn';
import SectorDefinition from '#sector/domain/model/sector_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default class Sector extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare economicalSituation: SectorEconomicalSituation;

  @column()
  declare ownershipType: SectorOwnershipType;

  @column()
  declare definitionId: number;

  @belongsTo(() => SectorDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof SectorDefinition>;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>;

  @hasMany(() => SocialClass)
  declare socialClasses: HasMany<typeof SocialClass>;

  @hasMany(() => SectorEconomicalSituationPerTurn)
  declare economicalSituationPerTurn: HasMany<typeof SectorEconomicalSituationPerTurn>;

  @beforeSave()
  public static async validateEconomicalSituationLevel(sector: Sector) {
    if (sector.economicalSituation < 0 || sector.economicalSituation > 4) {
      throw new Error('Invalid economicalSituation level');
    }
  }

  public setEconomicalSituation(economicalSituation: number): void {
    if (economicalSituation > 4) {
      economicalSituation = 4;
    }
    else if (economicalSituation < 0) {
      economicalSituation = 0;
    }

    this.economicalSituation = economicalSituation;
  }

  public setSocialClasses(socialClasses: SocialClass[]): void {
    this.$setRelated('socialClasses', socialClasses);
  }
}
