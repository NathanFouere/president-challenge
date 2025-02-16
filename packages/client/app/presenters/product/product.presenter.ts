import { injectable } from 'inversify';
import type ProductModule from '../../../server/repository/modules/product.module';
import { useGameStore } from '~/store/game/game.store';
import { useCustomToast } from '~/composables/useCustomToast';
import { useProductStore } from '~/store/product/product.store';

@injectable()
export class ProductPresenter {
  private readonly productModule: ProductModule = useNuxtApp().$api.product;
  public readonly productStore = useProductStore();
  private readonly gameStore = useGameStore();
  private readonly toast = useCustomToast();

  public async getProduct(productId: number): Promise<void> {
    try {
      this.productStore.setIsGettingProduct();
      const product = await this.productModule.getProduct(productId, this.gameStore.getSelectedGameId);
      this.productStore.setProduct(product);
    }
    catch {
      this.productStore.setErrorOnGetProduct();
      this.toast.showError('Failed to fetch product.');
    }
    finally {
      this.productStore.unsetErrorOnGetProduct();
      this.productStore.unsetIsGettingProduct();
    }
  }
}
