import type { MinimalProductDto } from '@president-challenge/shared/dist/product/minimal-product-dto';

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [] as MinimalProductDto[],
    gettingProducts: false,
    errorOnGetProducts: false,
  }),
  getters: {
    getProducts: state => state.products,
    isGettingProducts: state => state.gettingProducts,
    hadErrorOnGetProducts: state => state.errorOnGetProducts,
  },
  actions: {
    setProducts(products: MinimalProductDto[]) {
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
