<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card class="q-pa-lg q-gutter-y-md" bordered style="min-width: 400px">
        <div>
          <div>아이디</div>
          <q-input dense outlined v-model="idInput" :rules="idRules"></q-input>
        </div>

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
            dense
            outlined
            v-model="pwInput"
            :rules="pwRules"
            type="password"
          ></q-input>
        </div>

        <div>
          <div>비밀번호 확인</div>
          <q-input
            dense
            outlined
            v-model="pwCheck"
            :rules="pwCheckRules"
            type="password"
          ></q-input>
        </div>

        <div>
          <div>이름 (실명)</div>
          <q-input
            dense
            outlined
            v-model="nameInput"
            :rules="nameRules"
          ></q-input>
        </div>

        <div>
          <div>전공 (ex.인터넷보안공학과)</div>
          <div class="text-caption text-red">
            전공은 회원가입 이후 변경 불가합니다
          </div>
          <q-input
            dense
            outlined
            v-model="majorInput"
            :rules="majorRules"
          ></q-input>
        </div>

        <div class="row q-gutter-sm">
          <q-btn type="reset" flat color="primary" class="col">초기화</q-btn>
          <q-btn type="submit" unelevated color="primary" class="col"
            >회원가입</q-btn
          >
        </div>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../services/auth";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const idInput = ref("");
    const emailInput = ref("");
    const pwInput = ref("");
    const pwCheck = ref("");
    const nameInput = ref("");
    const majorInput = ref("");

    const idRules = [
      (val) => !!val || "아이디를 입력해주세요",
      (val) =>
        /^[a-zA-Z0-9]+$/.test(val) || "아이디는 영문자와 숫자만 허용됩니다",
    ];

    const emailRules = [
      (val) => !!val || "이메일을 입력해주세요",
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        "올바른 이메일 형식이 아닙니다",
    ];

    const pwRules = [
      (val) => !!val || "비밀번호를 입력해주세요",
      (val) => val.length >= 8 || "비밀번호는 8자 이상이어야 합니다",
    ];

    const pwCheckRules = [
      (val) => !!val || "비밀번호를 확인해주세요",
      (val) => val === pwInput.value || "비밀번호가 일치하지 않습니다",
    ];

    const nameRules = [(val) => !!val || "이름을 입력해주세요"];

    const majorRules = [(val) => !!val || "전공을 입력해주세요"];

    function onSubmit() {
      if (validateForm()) {
        const userData = {
          userId: idInput.value,
          email: emailInput.value,
          pw: pwInput.value,
          name: nameInput.value,
          major: majorInput.value,
        };

        const res = registerUser(emailInput.value, pwInput.value, userData);

        $q.notify({
          color: "primary",
          textColor: "white",
          icon: "cloud_done",
          message: "회원가입 완료",
        });

        $router.push("/login");
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "양식을 모두 올바르게 입력하세요",
        });
      }
    }

    function onReset() {
      idInput.value = "";
      emailInput.value = "";
      pwInput.value = "";
      pwCheck.value = "";
      nameInput.value = "";
      majorInput.value = "";
    }

    function validateForm() {
      return (
        idRules.every((rule) => rule(idInput.value)) &&
        emailRules.every((rule) => rule(emailInput.value)) &&
        pwRules.every((rule) => rule(pwInput.value)) &&
        pwCheckRules.every((rule) => rule(pwCheck.value)) &&
        nameRules.every((rule) => rule(nameInput.value)) &&
        majorRules.every((rule) => rule(majorInput.value))
      );
    }

    return {
      idInput,
      emailInput,
      pwInput,
      pwCheck,
      nameInput,
      majorInput,
      idRules,
      emailRules,
      pwRules,
      pwCheckRules,
      nameRules,
      majorRules,
      onSubmit,
      onReset,
    };
  },
});
</script>
