import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import Product from '#product/domain/models/product';

export default class ProductPricePerTurn extends SaveAmountForTurn {
  public static readonly table = 'product_price_per_turns';

  @column()
  declare productId: number;

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>;

  constructor() {
    super();
    this.color = 'blue';
  }
}
