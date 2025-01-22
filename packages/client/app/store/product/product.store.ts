import type { ProductDto } from '@shared/product/product-dto';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    product: null as ProductDto | null,
    gettingProduct: false,
    errorOnGetProduct: false,
  }),
  getters: {
    getProduct: state => state.product,
    hasProduct: state => state.product !== null,
    requireProduct(): ProductDto {
      if (!this.hasProduct) {
        throw new Error('Product is not available.');
      }
      return this.product as ProductDto;
    },
    isGettingProduct: state => state.gettingProduct,
    hadErrorOnGetProduct: state => state.errorOnGetProduct,
  },
  actions: {
    setProduct(product: ProductDto) {
      this.product = product;
    },
    setIsGettingProduct() {
      this.gettingProduct = true;
    },
    unsetIsGettingProduct() {
      this.gettingProduct = false;
    },
    setErrorOnGetProduct() {
      this.errorOnGetProduct = true;
    },
    unsetErrorOnGetProduct() {
      this.errorOnGetProduct = false;
    },
  },
});
