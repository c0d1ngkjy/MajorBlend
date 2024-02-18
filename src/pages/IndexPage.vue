<template>
  <q-page class="q-py-md row q-gutter-md" style="padding: 0 200px 0 200px">
    <div class="col">
      <div class="text-subtitle2">자유게시판</div>
      <q-list dense bordered separator>
        <q-item v-for="x in 20" :key="x">
          <q-item-section avatar>
            <q-img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHZ1ZWQzc3dodnF3cGJta2RuNjl0OWpheXBxdWxyNjBmOHlwams5MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZL2iRxhnDwtSE/giphy.gif"
            ></q-img>
          </q-item-section>

          <q-item-section>
            <q-item-label
              >사 스 케 <span class="text-red">[댓글count]</span>
            </q-item-label>
            <q-item-label>작성자</q-item-label>
            <q-item-label caption>카테고리 태그?</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>timeStamp</q-item-label>
            <q-item-label>조회수 ??</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-for="x in 20" :key="x">
          <q-item-section>t i t l e</q-item-section>
          <q-item-section side>
            <q-item-label>timeStamp</q-item-label>
            <q-item-label>조회수 ??</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
