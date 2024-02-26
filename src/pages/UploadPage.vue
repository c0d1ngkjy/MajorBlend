<template>
  <q-page>
    <q-form class="q-gutter-sm q-my-sm" @submit="onSubmit" @reset="onReset">
      <q-input
        maxlength="35"
        v-model="title"
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

    <q-card flat bordered>
      <div>{{ title }}</div>
      <div v-html="editor" />
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UploadPage",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const title = ref();
    const editor = ref("");

    function onReset() {
      title.value = "";
      editor.value = "";
    }

    return {
      title,
      editor,
      onReset,
    };
  },
});
</script>
