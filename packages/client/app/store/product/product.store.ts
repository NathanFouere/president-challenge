import type { ProductDto } from '@shared/typesproduct/product-dto';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as ProductDto[],
    gettingProducts: false,
    errorOnGetProducts: false,
  }),
  getters: {
    getProducts: state => state.products,
    isGettingProducts: state => state.gettingProducts,
    hadErrorOnGetProducts: state => state.errorOnGetProducts,
  },
  actions: {
    setProducts(products: ProductDto[]) {
      this.products = products;
    },
    setIsGettingProducts() {
      this.gettingProducts = true;
    },
    unsetIsGettingProducts() {
      this.gettingProducts = false;
    },
    setErrorOnGetProducts() {
      this.errorOnGetProducts = true;
    },
    unsetErrorOnGetProducts() {
      this.errorOnGetProducts = false;
    },
  },
});
