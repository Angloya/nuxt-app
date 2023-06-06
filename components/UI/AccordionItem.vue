<template>
  <div :class="$style.item" data-test="accordion">
    <div :class="$style.item__wrapper">
      <div :class="$style.item__title" data-test="accordionTitle" @click="showGoods">
        <IconArrow :class="iconClassNames" />
        <span>{{ props.title }}</span>
      </div>

      <div v-show="isShowGoods" data-test="accordionBody">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import IconArrow from "@/assets/images/icon-arrow.svg?component";

interface Props {
  title: string
}

const props = defineProps<Props>();
const style = useCssModule();

const isShowGoods: Ref<boolean> = ref(true);

const iconClassNames = computed(() => ({
  [style.icon]: true,
  [style.icon_down]: isShowGoods.value
}));

const showGoods = () => { isShowGoods.value = !isShowGoods.value; };
</script>

<style module>
.item {
  width: 100%;
}

@media only screen and (min-width : 720px) {
  .item {
    width: 50%;
  }
}

.item__title {
  display: flex;
  align-items: center;
  padding: 4px;
  font-weight: 700;
  background: #f0f8ff;
  border-bottom: 1px solid black;
  cursor: pointer;
}

.icon {
  margin-right: 8px;
}

.icon_down {
  transform: rotate(180deg);
}

.item__wrapper {
  margin: 4px;
  border: 1px solid black;
  border-bottom: 0;
}
</style>
