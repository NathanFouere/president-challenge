import type { LawDto } from '@shared/legislature/law-dto';

export const useLawStore = defineStore('lawStore', {
  state: () => ({
    law: null as LawDto | null,
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
    setLaw(law: LawDto) {
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
