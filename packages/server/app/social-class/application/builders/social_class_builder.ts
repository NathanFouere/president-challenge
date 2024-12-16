import type { SocialClassTypes } from '@shared/types/dist/types/social-class/social-class-types.js';
import type { HappinessLevels } from '@shared/types/common/happiness-levels.js';
import type { WealthLevels } from '@shared/types/social-class/wealth-levels.js';
import SocialClass from '#social-class/domain/models/social_class';

export class SocialClassBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private color: string | null = null;
  private wealthLevel: WealthLevels | null = null;
  private socialClassType: SocialClassTypes | null = null;
  private gameId: number | null = null;
  private happinessLevel: HappinessLevels | null = null;

  withName(name: string): SocialClassBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): SocialClassBuilder {
    this.description = description;
    return this;
  }

  withColor(color: string): SocialClassBuilder {
    this.color = color;
    return this;
  }

  withWealthLevel(wealthLevel: WealthLevels): SocialClassBuilder {
    this.wealthLevel = wealthLevel;
    return this;
  }

  withSocialClassType(socialClassType: SocialClassTypes): SocialClassBuilder {
    this.socialClassType = socialClassType;
    return this;
  }

  withGameId(gameId: number): SocialClassBuilder {
    this.gameId = gameId;
    return this;
  }

  withHappinessLevel(happinessLevel: HappinessLevels): SocialClassBuilder {
    this.happinessLevel = happinessLevel;
    return this;
  }

  build(): SocialClass {
    const socialClass = new SocialClass();
    if (this.name) socialClass.name = this.name;
    else throw new Error('Name is required');
    if (this.description) socialClass.description = this.description;
    else throw new Error('Description is required');
    if (this.color) socialClass.color = this.color;
    else throw new Error('Color is required');
    if (!this.wealthLevel) throw new Error('Wealth level is required');
    else socialClass.wealthLevel = this.wealthLevel;
    if (this.socialClassType) socialClass.type = this.socialClassType;
    else throw new Error('Social class type is required');
    if (this.gameId) socialClass.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.happinessLevel) socialClass.happinessLevel = this.happinessLevel;
    else throw new Error('Happiness level is required');
    return socialClass;
  }
}

export function aSocialClass(): SocialClassBuilder {
  return new SocialClassBuilder();
}
