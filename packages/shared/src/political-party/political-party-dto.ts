import type { PoliticalPartyMinimalDto } from '@shared/types/political-party/political-party-minimal-dto';
import type { HappinessLevels } from '@shared/types/common/happiness-levels';

export interface PoliticalPartyDTO extends PoliticalPartyMinimalDto {
  description: string;
  happinessLevel: HappinessLevels;
}
