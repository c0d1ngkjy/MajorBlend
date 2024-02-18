<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  ref,
  computed,
  watch,
  onMounted,
} from "vue";
import { useAuthStore } from "src/stores/authStore";
import { logoutUser } from "src/services/auth";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isUserAuthenticated);

    const isLoggedIn = ref(isAuthenticated.value);

    onMounted(() => {
      console.log(
        `\x1b[35m\r\n __  __    __     ____  _____  ____  ____  __    ____  _  _  ____  \r\n(  \\\/  )  \/__\\   (_  _)(  _  )(  _ \\(  _ \\(  )  ( ___)( \\( )(  _ \\ \r\n )    (  \/(__)\\ .-_)(   )(_)(  )   \/ ) _ < )(__  )__)  )  (  )(_) )\r\n(_\/\\\/\\_)(__)(__)\\____) (_____)(_)\\_)(____\/(____)(____)(_)\\_)(____\/ \r\n\x1b[0m`
      );
      console.log(`author: codingkjy28`);
      //console.log(isAuthenticated.value);
    });

    watch(isAuthenticated, (newValue) => {
      isLoggedIn.value = newValue;
      //console.log(isLoggedIn.value);
    });

    onBeforeMount(() => {
      authStore.restoreAuthState();
    });

    function logout() {
      logoutUser()
        .then(() => {
          authStore.logout();
          $q.notify({
            color: "grey",
            textColor: "white",
            message: "로그아웃 성공",
          });
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    }

    return {
      tab: ref("nav1"),
      userMajor: ref(),
      isLoggedIn,
      logout,
    };
  },
});
</script>
