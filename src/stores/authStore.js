import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = user != null;
      localStorage.setItem(
        "authState",
        JSON.stringify({ user, isAuthenticated: this.isAuthenticated })
      );
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("authState");
    },
    restoreAuthState() {
      const authState = localStorage.getItem("authState");
      if (authState) {
        const { user, isAuthenticated } = JSON.parse(authState);
        this.user = user;
        this.isAuthenticated = isAuthenticated;
      }
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.isAuthenticated,
  },
});
