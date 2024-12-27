import type { StateDto } from '@shared/typesstate/state-dto';

export const useStateStore = defineStore('stateStore', {
  state: () => ({
    state: null as StateDto | null,
    gettingState: false,
    errorOnGetState: false,
  }),
  getters: {
    getState: state => state.state,
    isGettingState: state => state.gettingState,
    hasErrorOnGetState: state => state.errorOnGetState,
    hasState: state => state.state !== null,
    requireState(state): StateDto {
      if (!state.state) {
        throw new Error('State is not set');
      }
      return state.state;
    },
  },
  actions: {
    setState(state: StateDto) {
      this.state = state;
    },
    setIsGettingState() {
      this.gettingState = true;
    },
    unsetIsGettingState() {
      this.gettingState = false;
    },
    setErrorOnGetState() {
      this.errorOnGetState = true;
    },
    unsetErrorOnGetState() {
      this.errorOnGetState = false;
    },
  },
});
