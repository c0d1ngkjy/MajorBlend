<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>로그인</q-card-section>

      <q-card-section>
        <div>아이디</div>
        <q-input v-model="idInput"></q-input>
      </q-card-section>

      <q-card-section>
        <div>비밀번호</div>
        <q-input v-model="pwInput"></q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const idInput = ref();
    const pwInput = ref();

    return {
      idInput,
      pwInput
    }
  }
})
</script>
