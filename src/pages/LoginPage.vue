<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit">
      <q-card class="q-pa-md q-gutter-y-sm" bordered style="min-width: 350px">
        <div>
          <div>이메일</div>
          <q-input
            dense
            outlined
            v-model="emailInput"
            :rules="emailRules"
          ></q-input>
        </div>

        <div>
          <div>비밀번호</div>
          <q-input
            type="password"
            dense
            outlined
            v-model="pwInput"
            :rules="pwRules"
          ></q-input>
        </div>

        <div>
          <q-btn type="submit" class="full-width" unelevated color="primary"
            >로그인</q-btn
          >
        </div>

        <div
          @click="$router.push('register')"
          class="cursor-pointer text-grey text-center"
        >
          회원가입
        </div>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { signIn } from "src/services/auth";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const emailInput = ref();
    const pwInput = ref();

    const emailRules = [(val) => !!val || "이메일을 입력해주세요"];
    const pwRules = [(val) => !!val || "비밀번호를 입력해주세요"];

    async function onSubmit() {
      if (validateForm()) {
        try {
          const res = await signIn(emailInput.value, pwInput.value);
          console.log(res);
          //store uid to userStore
          //send to homepage
        } catch (error) {
          console.error(error);
        }
      }
    }

    function validateForm() {
      return (
        emailRules.every((rule) => rule(emailInput.value)) &&
        pwRules.every((rule) => rule(pwInput.value))
      );
    }

    return {
      emailInput,
      pwInput,
      emailRules,
      pwRules,
      onSubmit,
    };
  },
});
</script>
