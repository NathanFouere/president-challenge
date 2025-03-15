import type { LevelDto } from '@president-challenge/shared/common/level-dto.js';
export default interface TaxDto {
    id: number;
    name: string;
    description: string;
    level: LevelDto;
}
