import type { ChoiceDto } from '@shared/event/choice-dto';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';

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
