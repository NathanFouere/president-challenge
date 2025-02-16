import { column } from '@adonisjs/lucid/orm';
import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import { TimeStampedModel } from '#common/model/timestamped_model';

export default abstract class HappinessModifier extends TimeStampedModel {
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
