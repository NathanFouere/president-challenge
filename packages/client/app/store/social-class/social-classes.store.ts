import type { MinimalSocialClassDto } from '@shared/typessocial-class/minimal-social-class-dto';

export const useSocialClassesStore = defineStore('socialClassesStore', {
  state: () => ({
    socialClasses: [] as MinimalSocialClassDto[],
    gettingSocialClasses: false,
    errorOnGetSocialClasses: false,
  }),
  getters: {
    getSocialClasses: state => state.socialClasses,
    isGettingSocialClasses: state => state.gettingSocialClasses,
    hadErrorOnGetSocialClasses: state => state.errorOnGetSocialClasses,
  },
  actions: {
    setSocialClasses(socialClasses: MinimalSocialClassDto[]) {
      this.socialClasses = socialClasses;
    },
    setIsGettingSocialClasses() {
      this.gettingSocialClasses = true;
    },
    unsetIsGettingSocialClasses() {
      this.gettingSocialClasses = false;
    },
    setErrorOnGetSocialClasses() {
      this.errorOnGetSocialClasses = true;
    },
    unsetErrorOnGetSocialClasses() {
      this.errorOnGetSocialClasses = false;
    },
  },
});
