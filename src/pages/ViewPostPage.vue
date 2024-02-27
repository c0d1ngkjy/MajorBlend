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
    <div class="q-py-md" v-html="postData.content" />
    <q-separator></q-separator>

    <q-list class="q-mx-lg" separator>
      <q-item v-for="comment in sortedCommentsArray" :key="comment">
        <q-item-section>
          <q-item-label caption>{{ comment.userName }}</q-item-label>
          <q-item-label>{{ comment.content }}</q-item-label>
        </q-item-section>

        <q-item-section side>{{
          new Date(
            comment.createdDate.seconds * 1000 +
              Math.floor(comment.createdDate.nanoseconds / 1e6)
          ).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
        }}</q-item-section>
      </q-item>
    </q-list>

    <q-form @submit="onSubmit" class="q-mt-sm">
      <q-card class="bg-dark q-pa-sm">
        <q-input
          :rules="commentRules"
          input-class="text-white"
          v-model="commentInput"
          maxlength="100"
          dense
          borderless
        ></q-input>
        <q-btn
          type="submit"
          unelevated
          color="primary"
          class="border-radius-10"
          label="답글달기"
        ></q-btn>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import {
  addNewComment,
  getAllComments,
  getSinglePost,
  incrementPostViews,
} from "src/services/board";
import { getUserData } from "src/services/user";
import { useAuthStore } from "src/stores/authStore";
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewPostPage",
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const $route = useRoute();
    const postData = ref({});
    const commentInput = ref("");
    const userData = ref({});
    const commentsArray = ref([]);

    const commentRules = [(val) => !!val || "답글내용을 입력해주세요"];

    const sortedCommentsArray = computed(() => {
      const copyArray = [...commentsArray.value];

      copyArray.sort((a, b) => b.createdDate.seconds - a.createdDate.seconds);

      return copyArray;
    });

    function validateForm() {
      return commentRules.every((rule) => rule(commentInput.value));
    }

    async function onSubmit() {
      if (validateForm()) {
        const commentData = {
          userName: userData.value.nickName,
          content: commentInput.value,
        };

        try {
          const res = await addNewComment(
            $route.params.bid,
            $route.params.pid,
            commentData
          );

          console.log(res);

          $q.notify({
            color: "primary",
            textColor: "white",
            icon: "cloud_done",
            message: "답글 등록 완료",
          });

          commentsArray.value = await getAllComments(
            $route.params.bid,
            $route.params.pid
          );
          commentInput.value = " ";
        } catch (error) {
          console.error(error);

          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "답글 등록 중 오류가 발생했습니다",
          });
        }
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "양식을 모두 올바르게 입력하세요",
        });
      }
    }

    onMounted(async () => {
      await incrementPostViews(
        $route.params.bid,
        $route.params.pid,
        authStore.user.uid
      );

      userData.value = await getUserData(authStore.user.uid);
      console.log(userData.value);

      postData.value = await getSinglePost(
        $route.params.bid,
        $route.params.pid
      );

      commentsArray.value = await getAllComments(
        $route.params.bid,
        $route.params.pid
      );

      postData.value.createdDate = new Date(
        postData.value.createdDate.seconds * 1000 +
          Math.floor(postData.value.createdDate.nanoseconds / 1e6)
      ).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    });

    return {
      postData,
      commentInput,
      commentsArray,
      sortedCommentsArray,
      commentRules,
      onSubmit,
    };
  },
});
</script>
