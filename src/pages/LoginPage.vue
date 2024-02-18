<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit">
      <q-card
        class="q-py-md q-px-lg q-gutter-y-sm border-radius-20"
        style="min-width: 300px"
      >
        <div>
          <div>이메일</div>
          <q-input dense v-model="emailInput" :rules="emailRules"></q-input>
        </div>

        <div>
          <div>비밀번호</div>
          <q-input
            type="password"
            dense
            v-model="pwInput"
            :rules="pwRules"
          ></q-input>
        </div>

        <div>
          <q-btn
            type="submit"
            class="full-width border-radius-20"
            color="primary"
            unelevated
            >로그인</q-btn
          >
        </div>

        <div
          @click="$router.push('register')"
          class="cursor-pointer text-caption text-grey text-center"
          style="text-decoration: underline"
        >
          회원가입
        </div>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { signIn } from "src/services/auth";
import { useAuthStore } from "src/stores/authStore";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const authStore = useAuthStore();
    const emailInput = ref();
    const pwInput = ref();

    const emailRules = [(val) => !!val || "이메일을 입력해주세요"];
    const pwRules = [(val) => !!val || "비밀번호를 입력해주세요"];

    async function onSubmit() {
      if (validateForm()) {
        try {
          const user = await signIn(emailInput.value, pwInput.value);
          authStore.setUser(user);
          $q.notify({
            color: "primary",
            textColor: "white",
            message: "로그인 성공",
          });
          $router.push("/");
        } catch (error) {
          console.error(error);
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "아이디 또는 비밀번호를 확인하세요",
          });
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
