import type { PoliticalPartyMinimalDto } from '@shared/political-party/political-party-minimal-dto';

export const usePoliticalPartiesStore = defineStore('politicalPartiesStore', {
  state: () => ({
    politicalParties: [] as PoliticalPartyMinimalDto[],
    gettingPoliticalParties: false,
    errorOnGetPoliticalParties: false,
  }),
  getters: {
    getPoliticalParties: state => state.politicalParties,
    isGettingPoliticalParties: state => state.gettingPoliticalParties,
    hadErrorOnGetPoliticalParties: state => state.errorOnGetPoliticalParties,
  },
  actions: {
    setPoliticalParties(politicalParties: PoliticalPartyMinimalDto[]) {
      this.politicalParties = politicalParties;
    },
    setIsGettingPoliticalParties() {
      this.gettingPoliticalParties = true;
    },
    unsetIsGettingPoliticalParties() {
      this.gettingPoliticalParties = false;
    },
    setErrorOnGetPoliticalParties() {
      this.errorOnGetPoliticalParties = true;
    },
    unsetErrorOnGetPoliticalParties() {
      this.errorOnGetPoliticalParties = false;
    },
  },
});
