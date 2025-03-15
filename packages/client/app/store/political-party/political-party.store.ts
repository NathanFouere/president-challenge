import type { PoliticalPartyDTO } from '@president-challenge/shared/dist/political-party/political-party-dto';

export const usePoliticalPartyStore = defineStore('politicalPartyStore', {
  state: () => ({
    politicalParty: null as PoliticalPartyDTO | null,
    gettingPoliticalParty: false,
    errorOnGetPoliticalParty: false,
  }),
  getters: {
    getPoliticalParty(state): PoliticalPartyDTO | null {
      return state.politicalParty;
    },
    isGettingPoliticalParty: state => state.gettingPoliticalParty,
    hadErrorOnGetPoliticalParty: state => state.errorOnGetPoliticalParty,
  },
  actions: {
    setPoliticalParty(politicalParty: PoliticalPartyDTO) {
      this.politicalParty = politicalParty;
    },
    setIsGettingPoliticalParty() {
      this.gettingPoliticalParty = true;
    },
    unsetIsGettingPoliticalParty() {
      this.gettingPoliticalParty = false;
    },
    setErrorOnGetPoliticalParty() {
      this.errorOnGetPoliticalParty = true;
    },
    unsetErrorOnGetPoliticalParty() {
      this.errorOnGetPoliticalParty = false;
    },
  },
});
