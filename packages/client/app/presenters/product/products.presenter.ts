import { injectable } from 'inversify';
import { useProductsStore } from '../../store/product/products.store';
import { useGameStore } from '../../store/game/game.store';
import { useCustomToast } from '../../composables/useCustomToast';
import type ProductModule from '../../../server/repository/modules/product.module';

@injectable()
export class ProductsPresenter {
  public readonly productModule: ProductModule = useNuxtApp().$api.product;
  public readonly productStore = useProductsStore();
  public readonly gameStore = useGameStore();
  public readonly toast = useCustomToast();

  public async getProducts(): Promise<void> {
    try {
      this.productStore.setIsGettingProducts();
      const products = await this.productModule.getProducts(this.gameStore.getSelectedGameId);
      this.productStore.setProducts(products);
    }
    catch (error) {
      this.productStore.setErrorOnGetProducts();
      this.toast.showError('Failed to fetch products.');
    }
    finally {
      this.productStore.unsetIsGettingProducts();
      this.productStore.unsetErrorOnGetProducts();
    }
  }
}
