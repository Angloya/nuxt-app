<template>
  <div data-test="wrapperInputCount">
    <input
      v-model="count"
      type="number"
      required
      :max="props.maxCount"
      min="0"
      data-test="inputCount"
      :class="$style.input"
      @input="changeCount"
    >

    <div v-if="isLimited">
      Количество ограничено ({{ props.maxCount }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
const emit = defineEmits<{(e: "changeCount", count: number): void }>();

interface Props {
  maxCount: number
}

const props = defineProps<Props>();

const count: Ref<number> = ref(1);

const changeCount = () => emit("changeCount", count.value);

// если в наличии осталось товара больше на 3 чем требуется
const isLimited = computed(() => count.value > (props.maxCount - 3));

// обрезает количество в нужном диапазоне
watchEffect(() => {
  if (count.value < 0 || !count.value) {
    count.value = 0;
  } else if (count.value > props.maxCount) {
    count.value = props.maxCount;
  }
});
</script>

<style module>
.input {
  width: 60px;
}
</style>
