import type { HappinessModifierType } from '@shared/common/happiness-modifier-type.js';

export default interface HappinessModifierDto {
  id: number;
  name: string;
  description: string;
  color: string;
  type: HappinessModifierType;
  duration: number | null;
}
