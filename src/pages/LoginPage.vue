<template>
  <q-page class="flex flex-center">
    <q-card bordered style="min-width: 350px">
      <q-card-section>
        <div>아이디</div>
        <q-input dense outlined v-model="idInput"></q-input>
      </q-card-section>

      <q-card-section>
        <div>비밀번호</div>
        <q-input dense outlined v-model="pwInput"></q-input>
      </q-card-section>

      <q-card-section>
        <q-btn class="full-width" unelevated color="primary">로그인</q-btn>
      </q-card-section>

      <q-card-section
        @click="$router.push('register')"
        class="cursor-pointer text-grey text-center"
      >
        회원가입
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const idInput = ref();
    const pwInput = ref();

    return {
      idInput,
      pwInput,
    };
  },
});
</script>
