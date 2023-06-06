<template>
  <div
    :key="price"
    :class="[$style.price, $style[priceChangeClass]]"
    data-test="exchangePrice"
  >
    {{ price }} ₽
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { useExchangeRateStore } from "~/stores/exchangeRate";
import { useFormatCurrency } from "~/composables/useUtils";

interface Props {
  price: number
}

const props = defineProps<Props>();

const priceChangeClass: Ref<string> = ref("");
const exchangeRateStore = useExchangeRateStore();

const price: Ref<number> = computed(() => useFormatCurrency(props.price, exchangeRateStore.exchangeRate));

// при изменении цены подсвечивает ячейку
watch(price, (newValue, oldValue) => {
  priceChangeClass.value = newValue > oldValue ? "price_up" : "price_down";
});
</script>

<style module>
@keyframes backgroundUp {
  0% {
    background: #f08080;
    display: block;
  }
  100% {
    background: none;
    display: none;
  }
}

@keyframes backgroundDown {
  0% {
    background: #8fbc8f;
    display: block;
  }
  100% {
    background: none;
    display: none;
  }
}

.price_up {
  animation: backgroundUp 2s;
}

.price_down {
  animation: backgroundDown 2s;
}

.price {
  padding: 8px;
  text-align: center;
  min-width: 80px;
}
</style>
