import type { PoliticalParty } from '@shared/typestypes/political-party/political-party';

export const usePoliticalPartyStore = defineStore('politicalPartyStore', {
  state: () => ({
    politicalParties: [] as PoliticalParty[],
  }),
  getters: {
    getPoliticalParties: state => state.politicalParties,
  },
  actions: {
    setPoliticalParties(politicalParties: PoliticalParty[]) {
      this.politicalParties = politicalParties;
    },
  },
});
