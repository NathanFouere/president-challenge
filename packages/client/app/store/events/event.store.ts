import type { EventDto } from '@shared/typesevent/event-dto';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    event: null as EventDto | null,
    gettingEvent: false,
    errorOnGettingEvent: false,
    loadingChoiceId: null as number | null,
  }),
  getters: {
    currentEvent(state): EventDto | null {
      return state.event;
    },
    hasCurrentEvent(state): boolean {
      return state.event !== null;
    },
    isGettingEvent(state): boolean {
      return state.gettingEvent;
    },
    hasErrorOnGettingEvent(state): boolean {
      return state.errorOnGettingEvent;
    },
    requireCurrentEvent(state): EventDto {
      if (state.event === null) {
        throw new Error('Event is not set');
      }
      return state.event;
    },
    getLoadingChoice(state): number {
      return state.loadingChoiceId;
    },
  },
  actions: {
    setLoadingChoiceId(choiceId: number) {
      this.loadingChoiceId = choiceId;
    },
    unsetLoadingChoiceId() {
      this.loadingChoiceId = null;
    },
    setEvent(event: EventDto) {
      this.event = event;
    },
    setGettingEvent() {
      this.gettingEvent = true;
    },
    unsetGettingEvent() {
      this.gettingEvent = false;
    },
    setErrorOnGettingEvent() {
      this.errorOnGettingEvent = true;
    },
    unsetErrorOnGettingEvent() {
      this.errorOnGettingEvent = false;
    },
  },
});
