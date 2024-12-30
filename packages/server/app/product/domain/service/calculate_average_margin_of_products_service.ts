import type Product from '#product/domain/models/product';

export class CalculateAverageMarginOfProductsService {
  public calculateAverageMarginOfProducts(products: Product[]): number {
    if (0 === products.length) {
      return 0;
    }
    return products.reduce((marginSum, product) => marginSum + (product.price - product.costOfProduction), 0) / products.length;
  }
}
