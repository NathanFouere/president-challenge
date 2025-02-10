import { BaseModel, beforeSave, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import LicensedFile from '#licensed-file/domain/models/licensed_file';
import Game from '#game/domain/models/game';
import Sector from '#sector/domain/model/sector';
import SocialClassEconomicalSituationPerTurn
  from '#social-class/domain/models/social_class_economical_situation_per_turn';
import SocialClassHappinessPerTurn from '#social-class/domain/models/social_class_happiness_per_turn';
import SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';
import SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';
import sectorEconomicalSituationMatchConfig
  from '#game-config/sector/sector-economical-situation-match-config.json' assert {type: 'json'};
import type Tax from '#tax/domain/model/tax';

export default class SocialClass extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare color: string;

  @column()
  declare economicalSituation: number;

  @column()
  declare type: SocialClassTypes;

  @column()
  declare subType: SocialClassSubtypes;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @hasMany(() => SocialClassFinancialFlow)
  declare financialFlows: HasMany<typeof SocialClassFinancialFlow>;

  @manyToMany(() => LicensedFile, {
    pivotTable: 'social_class_licensed_files',
    pivotForeignKey: 'social_class_id',
    pivotRelatedForeignKey: 'licensed_file_identifier',
    localKey: 'id',
    relatedKey: 'identifier',
  })
  declare licensedFiles: ManyToMany<typeof LicensedFile>;

  @hasMany(() => SocialClassEconomicalSituationPerTurn)
  declare economicalSituationPerTurn: HasMany<typeof SocialClassEconomicalSituationPerTurn>;

  @hasMany(() => SocialClassHappinessPerTurn)
  declare happinessPerTurn: HasMany<typeof SocialClassHappinessPerTurn>;

  @hasMany(() => SocialClassHappinessModifier)
  declare happinessModifiers: HasMany<typeof SocialClassHappinessModifier>;

  @column()
  declare sectorId: number;

  @belongsTo(() => Sector)
  declare sector: BelongsTo<typeof Sector>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  public getHappinessLevel(): number {
    const happinessLevel = this.happinessModifiers.reduce((acc, modifier) => acc + modifier.amount, 0);
    if (happinessLevel < 0) {
      return 0;
    }
    if (happinessLevel > 4) {
      return 4;
    }
    return happinessLevel;
  }

  public generateRevenueFromSector(): number {
    let revenuesFromSectors;
    switch (this.type) {
      case SocialClassTypes.CAPITALIST:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[this.sector.ownershipType][this.sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PETIT_BOURGEOIS:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[this.sector.ownershipType][this.sector.economicalSituation].owner;
        break;
      case SocialClassTypes.PROLETARIAT:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[this.sector.ownershipType][this.sector.economicalSituation].worker;
        break;
    }

    this.addEconomicalSituation(revenuesFromSectors);

    return revenuesFromSectors;
  }

  @beforeSave()
  public static async validateEconomicalSituationLevel(socialClass: SocialClass) {
    if (socialClass.economicalSituation < 0 || socialClass.economicalSituation > 100) {
      throw new Error('Invalid economicalSituation level');
    }
  }

  public addEconomicalSituation(addedEconomicalSituation: number) {
    let newEconomicalSituation = this.economicalSituation + addedEconomicalSituation;
    if (newEconomicalSituation < 0) {
      newEconomicalSituation = 0;
    }
    if (newEconomicalSituation > 100) {
      newEconomicalSituation = 100;
    }
    this.economicalSituation = newEconomicalSituation;
  }

  public payTaxOnWealth(tax: Tax): number {
    const taxAmount = tax.calculateTaxAmount(this.economicalSituation);
    this.addEconomicalSituation(-taxAmount);
    return taxAmount;
  }

  public getHappinessModifierValueFromEconomicalSituation(): number {
    switch (this.type) {
      case SocialClassTypes.PROLETARIAT:
        return this.economicalSituation > 30 ? 1 : -1;
      case SocialClassTypes.CAPITALIST:
        return this.economicalSituation > 75 ? 1 : -1;
      case SocialClassTypes.PETIT_BOURGEOIS:
        return this.economicalSituation > 50 ? 1 : -1;
      default:
        throw new Error('Invalid social class type');
    }
  }

  public setSector(sector: Sector): void {
    this.$setRelated('sector', sector);
  }

  public setFinancialFlows(financialFlows: SocialClassFinancialFlow[]): void {
    this.$setRelated('financialFlows', financialFlows);
  }
}
