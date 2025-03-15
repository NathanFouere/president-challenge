import type { LawGroupDto } from '@president-challenge/shared/legislature/law-group-dto.js';
export interface LawCategoryDto {
    id: number;
    name: string;
    description: string;
    lawGroups: LawGroupDto[];
}
