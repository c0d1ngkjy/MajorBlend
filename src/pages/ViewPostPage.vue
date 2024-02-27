<template>
  <q-page class="q-py-md">
    <div class="text-h6">{{ postData.title }}</div>
    <div class="row justify-between items-end text-caption">
      <div>글쓴이 : {{ postData.userName }}</div>

      <div class="column items-end">
        <div>조회수 : {{ postData.views }}</div>
        <div>작성일 : {{ postData.createdDate }}</div>
      </div>
    </div>

    <q-separator></q-separator>
    <div class="q-py-sm" v-html="postData.content" />
  </q-page>
</template>

<script>
import { getSinglePost, incrementPostViews } from "src/services/board";
import { useAuthStore } from "src/stores/authStore";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewPostPage",
  setup() {
    const authStore = useAuthStore();
    const $route = useRoute();
    const postData = ref({});

    onMounted(async () => {
      await incrementPostViews(
        $route.params.bid,
        $route.params.pid,
        authStore.user.uid
      );

      postData.value = await getSinglePost(
        $route.params.bid,
        $route.params.pid
      );

      postData.value.createdDate = new Date(
        postData.value.createdDate.seconds * 1000 +
          Math.floor(postData.value.createdDate.nanoseconds / 1e6)
      ).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    });

    return { postData };
  },
});
</script>
