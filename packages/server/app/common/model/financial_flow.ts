import { column } from '@adonisjs/lucid/orm';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';

export default class FinancialFlow extends SaveAmountForTurn {
  @column()
  declare name: string;
}
