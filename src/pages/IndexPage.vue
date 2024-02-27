<template>
  <q-page
    class="q-py-md row justify-between"
    :style="
      isMobile
        ? 'padding-left: 10px; padding-right: 10px'
        : 'padding-left: 7vw; padding-right: 7vw'
    "
  >
    <div class="col-2 q-pa-sm">
      <q-card
        flat
        bordered
        square
        class="flex flex-center"
        style="max-height: 240px"
      >
        <q-card-section>
          <q-img width="3vw" src="~assets/account.png"></q-img>
        </q-card-section>
        <q-card-section class="text-bold">{{
          userData.nickName
        }}</q-card-section>
      </q-card>
    </div>

    <div class="q-gutter-sm col-10">
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
          v-for="post in sortedMajorArray"
          :key="post"
        >
          <q-item-section v-if="post.views >= 3" avatar>
            <q-img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZmMnpvMzdveWZ5Yjk3MWRtbTIwOTlqZHQ5Mm85NjJ0ZTV6ODVzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lopx9eUi34rbq/giphy.gif"
            ></q-img>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ post.title }} </q-item-label>
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
        <q-item v-if="mainBoardArray.length == 0">
          <q-item-section>통합게시판에 등록된 글이 없습니다</q-item-section>
        </q-item>
        <q-item
          clickable
          @click="$router.push(`boards/${mainBoardId}/posts/${post.pid}`)"
          v-for="post in sortedMainArray"
          :key="post"
        >
          <q-item-section v-if="post.views >= 3" avatar>
            <q-img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZmMnpvMzdveWZ5Yjk3MWRtbTIwOTlqZHQ5Mm85NjJ0ZTV6ODVzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lopx9eUi34rbq/giphy.gif"
            ></q-img>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ post.title }} </q-item-label>
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
import {
  getAllPosts,
  getAllPostsFromIntegratedBoard,
  getMainBoardId,
} from "src/services/board";
import { getUserData } from "src/services/user";
import { useAuthStore } from "src/stores/authStore";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const authStore = useAuthStore();
    const userData = ref({});

    const isMobile = computed(() => Screen.lt.sm);
    const majorBoardArray = ref([]);
    const mainBoardArray = ref([]);
    const bid = ref();
    const mainBoardId = ref();

    const sortedMajorArray = computed(() => {
      const copyArray = [...majorBoardArray.value];

      copyArray.sort((a, b) => b.createdDate.seconds - a.createdDate.seconds);

      return copyArray;
    });

    const sortedMainArray = computed(() => {
      const copyArray = [...mainBoardArray.value];

      copyArray.sort((a, b) => b.createdDate.seconds - a.createdDate.seconds);

      return copyArray;
    });

    onMounted(async () => {
      userData.value = await getUserData(authStore.user.uid);
      majorBoardArray.value = await getAllPosts(userData.value.majorBoardId);
      mainBoardArray.value = await getAllPostsFromIntegratedBoard();
      mainBoardId.value = await getMainBoardId();
      bid.value = userData.value.majorBoardId;
      console.log(majorBoardArray.value);
    });

    return {
      isMobile,
      majorBoardArray,
      mainBoardId,
      bid,
      mainBoardArray,
      userData,
      sortedMajorArray,
      sortedMainArray,
    };
  },
});
</script>
