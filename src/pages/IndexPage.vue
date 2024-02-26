<template>
  <q-page
    class="q-py-md row q-gutter-md"
    style="padding-left: 10vw; padding-right: 10vw"
  >
    <div class="col">
      <div class="text-subtitle2">전공게시판</div>
      <q-list dense bordered separator>
        <q-item v-for="x in 20" :key="x">
          <q-item-section>
            <q-item-label
              >title <span class="text-red">[댓글count]</span>
            </q-item-label>
            <q-item-label>username</q-item-label>
            <q-item-label caption>카테고리 태그?</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>createDate</q-item-label>
            <q-item-label>views ??</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { Screen } from "quasar";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const isMobile = computed(() => Screen.lt.sm);

    return {
      isMobile,
    };
  },
});
</script>
