import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import ProductPricePerTurn from '#product/domain/models/product_price_per_turn';

export default class ProductPricePerTurnBuilder extends SaveAmountForTurnBuilder {
  private productId: number | null = null;

  public withProductId(productId: number): this {
    this.productId = productId;
    return this;
  }

  public build(): ProductPricePerTurn {
    const productPricePerTurn = new ProductPricePerTurn();

    if (this.amount) productPricePerTurn.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) productPricePerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.productId) productPricePerTurn.productId = this.productId;
    else throw new Error('Product id is required');

    return productPricePerTurn;
  }
}

export function aProductPricePerTurn(): ProductPricePerTurnBuilder {
  return new ProductPricePerTurnBuilder();
}
