<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="row justify-between items-center q-px-xl q-py-md bg-white text-black"
      bordered
    >
      <div>
        <div class="text-h5 text-weight-bolder">MajorBlend</div>
        <div class="text-primary">{{ userMajor }}</div>
      </div>

      <q-img
        class="absolute-left"
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczdqdXJjbWRoZjhhajlwZGRnY2d1dGFpMzVpeXJrdzMzbHA2NXcycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W4UOZK3EacuywD9reC/giphy.gif"
        width="30px"
      ></q-img>

      <q-tabs
        v-model="tab"
        active-class="text-weight-bolder text-purple"
        indicator-color="transparent"
      >
        <q-tab @click="$router.push('/')" name="nav1" label="홈" />
        <q-tab name="nav2" label="nav2" />
        <q-tab name="nav3" label="nav3" />
      </q-tabs>

      <div class="q-gutter-sm">
        <q-btn to="/nwpost" color="primary" unelevated>글쓰기</q-btn>
        <q-btn to="/login" outline>로그인</q-btn>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    onMounted(() => {
      console.log(
        `\x1b[35m\r\n __  __    __     ____  _____  ____  ____  __    ____  _  _  ____  \r\n(  \\\/  )  \/__\\   (_  _)(  _  )(  _ \\(  _ \\(  )  ( ___)( \\( )(  _ \\ \r\n )    (  \/(__)\\ .-_)(   )(_)(  )   \/ ) _ < )(__  )__)  )  (  )(_) )\r\n(_\/\\\/\\_)(__)(__)\\____) (_____)(_)\\_)(____\/(____)(____)(_)\\_)(____\/ \r\n\x1b[0m`
      );
      console.log(`author: codingkjy28`);
    });

    return {
      tab: ref("nav1"),
      userMajor: ref("사용자 전공"),
    };
  },
});
</script>
