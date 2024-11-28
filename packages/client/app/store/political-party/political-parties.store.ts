import type { PoliticalPartyDTO } from '@shared/typespolitical-party/political-party-dto';

export const usePoliticalPartiesStore = defineStore('politicalPartiesStore', {
  state: () => ({
    politicalParties: [] as PoliticalPartyDTO[],
    gettingPoliticalParties: false,
    errorOnGetPoliticalParties: false,
  }),
  getters: {
    getPoliticalParties: state => state.politicalParties,
    isGettingPoliticalParties: state => state.gettingPoliticalParties,
    hadErrorOnGetPoliticalParties: state => state.errorOnGetPoliticalParties,
  },
  actions: {
    setPoliticalParties(politicalParties: PoliticalPartyDTO[]) {
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
