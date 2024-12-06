import type { PoliticalPartyMinimalDto } from '@shared/types/political-party/political-party-minimal-dto';

export interface PoliticalPartyDTO extends PoliticalPartyMinimalDto {
  description: string;
}
