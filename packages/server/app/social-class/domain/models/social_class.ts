import { beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';
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
import SocialClassDefinition from '#social-class/domain/models/social_class_definition';
import { TimeStampedModel } from '#common/model/timestamped_model';
import { HappinessLevel } from '#social-class/domain/models/happiness_level';
import type PoliticalParty from '#political-party/domain/models/political_party';
import socialClassDefaultVoteRatioForPoliticalAffiliationConfig from '#game-config/political-party/social_class_default_vote_ratio_for_political_party_config.json' assert { type: 'json' };

export default class SocialClass extends TimeStampedModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare economicalSituation: number;

  @column()
  declare gameId: number;

  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>;

  @column()
  declare definitionId: number;

  @belongsTo(() => SocialClassDefinition, {
    foreignKey: 'definitionId',
  })
  declare definition: BelongsTo<typeof SocialClassDefinition>;

  @hasMany(() => SocialClassFinancialFlow)
  declare financialFlows: HasMany<typeof SocialClassFinancialFlow>;

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

  public getHappinessLevel(): HappinessLevel {
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
    switch (this.definition.type) {
      case SocialClassTypes.BUSINESS_OWNER:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[this.sector.ownershipType][this.sector.economicalSituation].owner;
        break;
      case SocialClassTypes.WORKING_CLASS:
        revenuesFromSectors = sectorEconomicalSituationMatchConfig[this.sector.ownershipType][this.sector.economicalSituation].owner;
        break;
      case SocialClassTypes.MIDDLE_CLASS:
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
    switch (this.definition.type) {
      case SocialClassTypes.MIDDLE_CLASS:
        return this.economicalSituation > 30 ? 1 : -1;
      case SocialClassTypes.BUSINESS_OWNER:
        return this.economicalSituation > 75 ? 1 : -1;
      case SocialClassTypes.WORKING_CLASS:
        return this.economicalSituation > 50 ? 1 : -1;
      default:
        throw new Error('Invalid social class type');
    }
  }

  public getVotesOfSocialClassForPoliticalParty(politicalParty: PoliticalParty): number {
    const defaultRatio = socialClassDefaultVoteRatioForPoliticalAffiliationConfig[this.definition.type][politicalParty.definition.affiliation];
    // Niveau de bonheur normalisé entre -2 et +2 (par rapport au neutre)
    const normalizedHappiness = this.getHappinessLevel() - HappinessLevel.NEUTRAL; // -2 à +2

    let votingRatio: number;

    if (politicalParty.inPower) {
      // Si le parti est au pouvoir:
      // - Les gens heureux (+) votent davantage pour lui
      // - Les gens mécontents (-) votent moins pour lui
      votingRatio = defaultRatio * (1 + 0.3 * normalizedHappiness);
    }
    else {
      // Si le parti n'est pas au pouvoir:
      // - Les gens heureux (+) votent moins pour lui
      // - Les gens mécontents (-) votent davantage pour lui
      votingRatio = defaultRatio * (1 - 0.2 * normalizedHappiness);
    }

    // Limiter la variation pour éviter des valeurs extrêmes
    votingRatio = Math.max(defaultRatio * 0.2, Math.min(defaultRatio * 2.5, votingRatio));

    return this.definition.population * votingRatio;
  }

  public setSector(sector: Sector): void {
    this.$setRelated('sector', sector);
  }

  public setFinancialFlows(financialFlows: SocialClassFinancialFlow[]): void {
    this.$setRelated('financialFlows', financialFlows);
  }
}
