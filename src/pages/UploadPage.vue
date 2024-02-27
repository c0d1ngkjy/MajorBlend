<template>
  <q-page>
    <q-form class="q-gutter-sm q-my-sm" @submit="onSubmit" @reset="onReset">
      <q-toggle v-model="mainBoard" label="통합게시판"></q-toggle>
      <q-input
        maxlength="35"
        v-model="title"
        :rules="titleRules"
        outlined
        dense
        label="제목"
      ></q-input>

      <q-editor v-model="editor" min-height="30rem" />

      <div class="row justify-end q-gutter-sm">
        <q-btn
          type="reset"
          outline
          color="primary"
          class="col-1 border-radius-10"
          >초기화</q-btn
        >
        <q-btn
          type="submit"
          unelevated
          color="primary"
          class="col-1 border-radius-10"
          >등록하기</q-btn
        >
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { createNewPost } from "src/services/board";
import { getUserData } from "src/services/user";
import { useAuthStore } from "src/stores/authStore";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UploadPage",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const authStore = useAuthStore();
    const title = ref("");
    const editor = ref("");
    const bid = ref();
    const userName = ref();
    const mainBoard = ref(false);

    const titleRules = [(val) => !!val || "제목을 입력해주세요"];
    const editorRules = [
      (val) => !!val || "내용을 입력해주세요",
      (val) => val.length > 300 || "내용은 300자까지만 입력가능합니다",
    ];

    function validateForm() {
      return (
        titleRules.every((rule) => rule(title.value)) &&
        editorRules.every((rule) => rule(editor.value))
      );
    }

    async function onSubmit() {
      if (validateForm()) {
        const postData = {
          userName: userName.value,
          title: title.value,
          content: editor.value,
          isMain: mainBoard.value,
        };
        try {
          const res = await createNewPost(
            authStore.user.uid,
            bid.value,
            postData
          );
          console.log(res);

          $q.notify({
            color: "primary",
            textColor: "white",
            icon: "cloud_done",
            message: "글 등록 완료",
          });

          $router.push(`boards/${res.boardId}/posts/${res.postId}`);
        } catch (error) {
          console.error(error);

          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "글 등록중 오류가 발생했습니다",
          });
        }
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "본문은 300자까지만 입력가능합니다",
        });
      }
    }

    function onReset() {
      title.value = "";
      editor.value = "";
    }

    onMounted(async () => {
      const userData = await getUserData(authStore.user.uid);
      userName.value = userData.nickName;
      bid.value = userData.majorBoardId;
    });

    return {
      title,
      editor,
      titleRules,
      editorRules,
      onReset,
      onSubmit,
      mainBoard,
    };
  },
});
</script>
