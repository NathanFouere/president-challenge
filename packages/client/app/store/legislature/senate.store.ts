import type { SenateDto } from '../../../../shared/src/legislature/senate-dto';

export const useSenateStore = defineStore('senateStore', {
  state: () => ({
    senate: null as SenateDto | null,
    gettingSenate: false,
  }),
  getters: {
    getSenate: state => state.senate,
    isGettingSenate: state => state.gettingSenate,
    hasSenate: state => state.senate !== null,
  },
  actions: {
    setSenate(senate: SenateDto) {
      this.senate = senate;
    },
    setIsGettingSenate() {
      this.gettingSenate = true;
    },
    unsetIsGettingSenate() {
      this.gettingSenate = false;
    },
  },
});
