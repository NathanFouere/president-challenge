import type { ChoiceDto } from '@president-challenge/shared/event/choice-dto.js';
import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { ElectionResultsDto } from '@president-challenge/shared/event/election-results-dto.js';
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
