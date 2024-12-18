import { injectable } from 'inversify';
import { useGameStore } from '../../store/game/game.store';
import { useCustomToast } from '../../composables/useCustomToast';
import type ProductModule from '../../../server/repository/modules/product.module';
import { useProductStore } from '../../store/product/product.store';

@injectable()
export class ProductPresenter {
  public readonly productModule: ProductModule = useNuxtApp().$api.product;
  public readonly productStore = useProductStore();
  public readonly gameStore = useGameStore();
  public readonly toast = useCustomToast();

  public async getProduct(productId: number): Promise<void> {
    try {
      this.productStore.setIsGettingProduct();
      const product = await this.productModule.getProduct(productId, this.gameStore.getSelectedGameId);
      this.productStore.setProduct(product);
    }
    catch (error) {
      this.productStore.setErrorOnGetProduct();
      this.toast.showError('Failed to fetch product.');
    }
    finally {
      this.productStore.unsetErrorOnGetProduct();
      this.productStore.unsetIsGettingProduct();
    }
  }
}
