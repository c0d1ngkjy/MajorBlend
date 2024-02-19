<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="isMobile ? 'column content-center' : 'row justify-between'"
      class="items-center q-py-sm bg-dark text-white"
      style="padding-left: 20vw; padding-right: 20vw"
      elevated
    >
      <div>
        <div
          @click="$router.push('/')"
          class="cursor-pointer text-h5 text-weight-bolder"
        >
          MajorBlend
        </div>
        <div class="text-primary">{{ userMajor }}</div>
      </div>

      <q-tabs
        v-model="tab"
        active-class="text-weight-bolder text-primary"
        indicator-color="transparent"
      >
        <q-tab name="nav1" label="b" />
        <q-tab name="nav2" label="c" />
        <q-tab name="nav3" label="a" />
        <q-tab name="nav4" label="a" />
      </q-tabs>

      <div class="q-gutter-sm">
        <q-btn
          v-if="isLoggedIn"
          class="border-radius-20"
          to="/nwpost"
          color="primary"
          unelevated
          >글작성하기</q-btn
        >
        <q-btn
          class="border-radius-20"
          v-if="!isLoggedIn"
          color="primary"
          to="/login"
          outline
          >로그인</q-btn
        >
        <q-btn
          class="border-radius-20"
          v-if="isLoggedIn"
          color="primary"
          @click="logout"
          outline
          >로그아웃</q-btn
        >
      </div>
    </q-header>

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
import { Screen, useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isUserAuthenticated);
    const isMobile = computed(() => Screen.lt.sm);

    const isLoggedIn = ref(isAuthenticated.value);

    onMounted(() => {
      console.log(
        "\x1b[38;2;249;31m\r\n __  __    __     ____  _____  ____  ____  __    ____  _  _  ____  \r\n(  \\\/  )  \/__\\   (_  _)(  _  )(  _ \\(  _ \\(  )  ( ___)( \\( )(  _ \\ \r\n )    (  \/(__)\\ .-_)(   )(_)(  )   \/ ) _ < )(__  )__)  )  (  )(_) )\r\n(_\/\\\/\\_)(__)(__)\\____) (_____)(_)\\_)(____\/(____)(____)(_)\\_)(____\/ \r\n\x1b[0mauthor: codingkjy28"
      );

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
      isMobile,
    };
  },
});
</script>
