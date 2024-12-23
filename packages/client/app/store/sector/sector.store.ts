import type { SectorDto } from '@shared/typessector/sector-dto';

export const useSectorStore = defineStore('sectorStore', {
  state: () => ({
    sector: null as SectorDto | null,
    gettingSector: false,
    errorOnGetSector: false,
  }),
  getters: {
    getSector: state => state.sector,
    isGettingSector: state => state.gettingSector,
    hasErrorOnGetSector: state => state.errorOnGetSector,
    hasSector: state => state.sector !== null,
    requireSector(state): SectorDto {
      if (!state.sector) {
        throw new Error('Sector is not set');
      }
      return state.sector;
    },
  },
  actions: {
    setSector(sector: SectorDto) {
      this.sector = sector;
    },
    setIsGettingSector() {
      this.gettingSector = true;
    },
    unsetIsGettingSector() {
      this.gettingSector = false;
    },
    setErrorOnGetSector() {
      this.errorOnGetSector = true;
    },
    unsetErrorOnGetSector() {
      this.errorOnGetSector = false;
    },
  },
});
