import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto';

export const useLawStore = defineStore('lawStore', {
  state: () => ({
    law: null as MinimalLawDto | null,
    gettingLaw: false,
    votingLaw: false,
  }),
  getters: {
    getLaw: state => state.law,
    isGettingLaw: state => state.gettingLaw,
    hasLaw: state => state.law !== null,
    isVotingLaw: state => state.votingLaw,
    requireLaw: (state) => {
      if (state.law === null) {
        throw new Error('Law is required');
      }
      return state.law;
    },
  },
  actions: {
    setLaw(law: MinimalLawDto) {
      this.law = law;
    },
    setIsGettingLaw() {
      this.gettingLaw = true;
    },
    unsetIsGettingLaw() {
      this.gettingLaw = false;
    },
    setIsVotingLaw() {
      this.votingLaw = true;
    },
    unsetIsVotingLaw() {
      this.votingLaw = false;
    },
  },
});
