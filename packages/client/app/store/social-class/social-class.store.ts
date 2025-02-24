import type { SocialClassDto } from '@shared/social-class/social-class-dto';

export const useSocialClassStore = defineStore('socialClassStore', {
  state: () => ({
    socialClass: null as SocialClassDto | null,
    gettingSocialClass: false,
    errorOnGetSocialClass: false,
  }),
  getters: {
    getSocialClass: state => state.socialClass,
    isGettingSocialClass: state => state.gettingSocialClass,
    hadErrorOnGetSocialClass: state => state.errorOnGetSocialClass,
    hasSocialClass: state => state.socialClass !== null,
    requireSocialClass: (state) => {
      if (state.socialClass === null) {
        throw new Error('Social class not found');
      }
      return state.socialClass;
    },
  },
  actions: {
    setSocialClass(socialClass: SocialClassDto) {
      this.socialClass = socialClass;
    },
    setIsGettingSocialClass() {
      this.gettingSocialClass = true;
    },
    unsetIsGettingSocialClass() {
      this.gettingSocialClass = false;
    },
    setErrorOnGetSocialClass() {
      this.errorOnGetSocialClass = true;
    },
    unsetErrorOnGetSocialClass() {
      this.errorOnGetSocialClass = false;
    },
  },
});
