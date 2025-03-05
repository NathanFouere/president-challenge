import type { ChoiceDto } from '@shared/event/choice-dto.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { ElectionResultsDto } from '@shared/event/election-results-dto.js';

export interface EventDto {
  id: number;
  identifier: string;
  title: string;
  text: string;
  isAvailable: boolean;
  beenRead: boolean;
  needsAction: boolean;
  choices: ChoiceDto[];
  licensedFiles: LicensedFileDTO[];
  electionResults: ElectionResultsDto | null;
}
