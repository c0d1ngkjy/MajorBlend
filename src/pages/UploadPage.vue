<template>
  <q-page class="">
    <div>//upload new post</div>

    <div>글 제목</div>
    <q-input></q-input>
    <textarea name="" id="" cols="30" rows="10"></textarea>
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

    return {};
  },
});
</script>
