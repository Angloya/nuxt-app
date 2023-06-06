<template>
  <div>
    <MainTable :groups="groups" />
    <MainCart />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { SortedGroups } from "~/types/interfaces";
import { useExchangeRateStore } from "~/stores/exchangeRate";

const PULLING_TIMEOUT_MS = 15000;
const RANDOM_EXCHAGE_MIN = 20;
const RANDOM_EXCHAGE_MAX = 80;
let intervalId: NodeJS.Timeout;
const exchangeRateStore = useExchangeRateStore();

const { data: goodsData, error: goodsError, refresh } = await useFetch("/api/goods");

const { data: namesData, error: namesError } = await useFetch("/api/names");

if (namesError.value) {
  showError(namesError.value as Error);
}

watchEffect(() => {
  if (goodsError.value) {
    showError(goodsError.value as Error);
  }
});

// перезапрашивает информацию о товарах каждые 15 секунд и устанавливаем новый курс валют
const startInterval = () => {
  intervalId = setInterval(async () => {
    await refresh();
    const newExchangeRate = useRandomNumber(RANDOM_EXCHAGE_MIN, RANDOM_EXCHAGE_MAX);
    exchangeRateStore.setExchangeRate(newExchangeRate);
  }, PULLING_TIMEOUT_MS);
};

startInterval();

const groups: Ref<SortedGroups> = computed(() => {
  if (goodsData.value && namesData.value) {
    const initialGoods = goodsData.value?.Value.Goods;

    // для каждой группы добавляет товары соответствующие данной группе
    // для каждого товара добавляет имя
    const sortedGoods = Object.entries(namesData.value).map(([key, value]) => {
      const groupGoods = initialGoods.filter(({ G }) => Number(key) === G);
      const updatedGroup = groupGoods.map((item) => {
        return { Amount: 0, Category: value.G, Name: value.B[item.T].N, ...item };
      });
      return [key, { Name: value.G, Goods: updatedGroup }];
    });
    return Object.fromEntries(sortedGoods);
  }
  return {};
});

onUnmounted(() => clearTimeout(intervalId));
</script>
