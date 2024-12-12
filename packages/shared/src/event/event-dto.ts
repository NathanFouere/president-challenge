import type { ChoiceDto } from '@shared/types/event/choice-dto';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

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
}
