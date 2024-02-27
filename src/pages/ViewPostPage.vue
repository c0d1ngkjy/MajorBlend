<template>
  <q-page>
    <div class="text-h5">{{ postData.title }}</div>
    <div>{{ postData.userName }}</div>
    <div>
      {{ postData.createdDate }}
    </div>

    <div>{{ postData.views }}</div>
    <q-separator></q-separator>
    <div v-html="postData.content" />
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
