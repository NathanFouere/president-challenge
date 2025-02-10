import { BaseModel, column } from '@adonisjs/lucid/orm';
import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';

export default abstract class HappinessModifier extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare description: string;

  @column()
  declare color: string;

  @column()
  declare type: HappinessModifierType;

  @column()
  declare duration: number | null;

  @column()
  declare amount: number;

  @column()
  declare lawOriginId?: number;

  public reduceDuration(): void {
    if (this.type == HappinessModifierType.TEMPORARY && this.duration !== null) {
      this.duration--;
    }
  }
}
