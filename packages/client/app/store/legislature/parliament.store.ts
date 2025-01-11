import type { ParliamentDto } from '@shared/legislature/parliament-dto';

export const useParliamentStore = defineStore('parliamentStore', {
  state: () => ({
    parliament: null as ParliamentDto | null,
    gettingParliament: false,
  }),
  getters: {
    getParliament: state => state.parliament,
    hasParliament: state => state.parliament !== null,
    isGettingParliament: state => state.gettingParliament,
  },
  actions: {
    setParliament(parliament: ParliamentDto) {
      this.parliament = parliament;
    },
    setIsGettingParliament() {
      this.gettingParliament = true;
    },
    unsetIsGettingParliament() {
      this.gettingParliament = false;
    },
  },
});
