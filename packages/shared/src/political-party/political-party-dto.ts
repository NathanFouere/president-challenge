import type { PoliticalPartyMinimalDto } from '@shared/political-party/political-party-minimal-dto';
import type { HappinessLevels } from '@shared/common/happiness-levels';

export interface PoliticalPartyDTO extends PoliticalPartyMinimalDto {
  description: string;
  happinessLevel: HappinessLevels;
}
