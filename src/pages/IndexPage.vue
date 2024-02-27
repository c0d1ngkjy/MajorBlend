<template>
  <q-page class="q-py-md" style="padding-left: 10vw; padding-right: 10vw">
    <div class="q-gutter-sm">
      <div class="text-subtitle2">전공게시판</div>
      <q-list bordered separator>
        <q-item v-if="majorBoardArray.length == 0">
          <q-item-section
            >해당 전공게시판에 등록된 글이 없습니다</q-item-section
          >
        </q-item>
        <q-item
          clickable
          @click="$router.push(`boards/${bid}/posts/${post.pid}`)"
          v-for="post in majorBoardArray"
          :key="post"
        >
          <q-item-section>
            <q-item-label
              >{{ post.title }} <span class="text-red">[댓글count]</span>
            </q-item-label>
            <q-item-label caption>{{ post.userName }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{
              new Date(
                post.createdDate.seconds * 1000 +
                  Math.floor(post.createdDate.nanoseconds / 1e6)
              ).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
            }}</q-item-label>
            <q-item-label>조회수 {{ post.views }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-subtitle2 q-mt-lg">통합게시판</div>
      <q-list bordered separator>
        <q-item v-if="majorBoardArray.length == 0">
          <q-item-section
            >해당 전공게시판에 등록된 글이 없습니다</q-item-section
          >
        </q-item>
        <q-item
          clickable
          @click="$router.push(`boards/${bid}/posts/${post.pid}`)"
          v-for="post in majorBoardArray"
          :key="post"
        >
          <q-item-section>
            <q-item-label
              >{{ post.title }} <span class="text-red">[댓글count]</span>
            </q-item-label>
            <q-item-label caption>{{ post.userName }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{
              new Date(
                post.createdDate.seconds * 1000 +
                  Math.floor(post.createdDate.nanoseconds / 1e6)
              ).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
            }}</q-item-label>
            <q-item-label>조회수 {{ post.views }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { Screen } from "quasar";
import { getAllPosts } from "src/services/board";
import { getUserData } from "src/services/user";
import { useAuthStore } from "src/stores/authStore";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const authStore = useAuthStore();

    const isMobile = computed(() => Screen.lt.sm);
    const majorBoardArray = ref([]);
    const bid = ref();

    onMounted(async () => {
      const userData = await getUserData(authStore.user.uid);
      majorBoardArray.value = await getAllPosts(userData.majorBoardId);
      bid.value = userData.majorBoardId;
      console.log(majorBoardArray.value);
    });

    return {
      isMobile,
      majorBoardArray,
      bid,
    };
  },
});
</script>
