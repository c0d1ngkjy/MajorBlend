<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card
        class="q-py-md q-px-lg q-gutter-y-md border-radius-10"
        style="min-width: 400px"
      >
        <div>
          <div>이메일</div>
          <q-input dense v-model="emailInput" :rules="emailRules"></q-input>
        </div>

        <div>
          <div>아이디 (닉네임)</div>
          <q-input
            maxlength="10"
            dense
            v-model="nickNameInput"
            :rules="nickNameRules"
          ></q-input>
        </div>

        <div>
          <div>비밀번호</div>
          <q-input
            maxlength="12"
            dense
            v-model="pwInput"
            :rules="pwRules"
            type="password"
          ></q-input>
        </div>

        <div>
          <div>비밀번호 확인</div>
          <q-input
            maxlength="12"
            dense
            v-model="pwCheck"
            :rules="pwCheckRules"
            type="password"
          ></q-input>
        </div>

        <div>
          <div>이름 (실명)</div>
          <q-input
            maxlength="6"
            dense
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
            maxlength="20"
            dense
            v-model="majorInput"
            :rules="majorRules"
          ></q-input>
        </div>

        <div class="row q-gutter-sm">
          <q-btn
            type="reset"
            outline
            color="primary"
            class="col border-radius-10"
            >초기화</q-btn
          >
          <q-btn
            type="submit"
            unelevated
            color="primary"
            class="col border-radius-10"
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
import { checkOrCreateBoard } from "src/services/board";
import { addMajorBoardIdToUserData } from "src/services/user";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const emailInput = ref("");
    const pwInput = ref("");
    const pwCheck = ref("");
    const nameInput = ref("");
    const majorInput = ref("");
    const nickNameInput = ref("");

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
    const nickNameRules = [(val) => !!val || "아이디를 입력해주세요"];

    const majorRules = [(val) => !!val || "전공을 입력해주세요"];

    async function onSubmit() {
      if (validateForm()) {
        const userData = {
          email: emailInput.value,
          pw: pwInput.value,
          name: nameInput.value,
          nickName: nickNameInput.value,
          major: majorInput.value,
        };

        try {
          const res = await registerUser(
            emailInput.value,
            pwInput.value,
            userData
          );
          console.log(res);

          const majorBoardId = await checkOrCreateBoard(userData.major);
          console.log(majorBoardId);

          const e = await addMajorBoardIdToUserData(res.uid, majorBoardId);
          console.log(e);

          $q.notify({
            color: "primary",
            textColor: "white",
            icon: "cloud_done",
            message: "회원가입 완료",
          });

          $router.push("/login");
        } catch (error) {
          console.error(error);

          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "회원가입 중 오류가 발생했습니다",
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

    function onReset() {
      emailInput.value = "";
      pwInput.value = "";
      pwCheck.value = "";
      nameInput.value = "";
      majorInput.value = "";
      nickNameInput.value = "";
    }

    function validateForm() {
      return (
        emailRules.every((rule) => rule(emailInput.value)) &&
        pwRules.every((rule) => rule(pwInput.value)) &&
        pwCheckRules.every((rule) => rule(pwCheck.value)) &&
        nameRules.every((rule) => rule(nameInput.value)) &&
        majorRules.every((rule) => rule(majorInput.value)) &&
        nickNameRules.every((rule) => rule(nickNameInput.value))
      );
    }

    return {
      emailInput,
      pwInput,
      pwCheck,
      nameInput,
      nickNameInput,
      majorInput,
      emailRules,
      pwRules,
      nickNameRules,
      pwCheckRules,
      nameRules,
      majorRules,
      onSubmit,
      onReset,
    };
  },
});
</script>
