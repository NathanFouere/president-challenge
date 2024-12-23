import type { SectorDto } from '@shared/typessector/sector-dto';

export const useSectorsStore = defineStore('sectorsStore', {
  state: () => ({
    sectors: [] as SectorDto[],
    gettingSectors: false,
  }),
  getters: {
    getSectors: state => state.sectors,
    hasSectors: state => state.sectors.length > 0,
    isGettingSectors: state => state.gettingSectors,
  },
  actions: {
    setSectors(sectors: SectorDto[]) {
      this.sectors = sectors;
    },
    setIsGettingSectors() {
      this.gettingSectors = true;
    },
    unsetIsGettingSectors() {
      this.gettingSectors = false;
    },
  },
});
