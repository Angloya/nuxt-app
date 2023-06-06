<template>
  <div data-test="cartGood">
    <div :class="$style.name" data-test="goodName">
      {{ props.good.Category }}. {{ props.good.Name }}
    </div>

    <div :class="$style.count">
      <CartInputCount :max-count="good.P" @changeCount="countSum" />
    </div>

    <div :class="$style.price" data-test="goodPrice">
      {{ price }} ₽ / шт.
    </div>

    <div :class="$style.price">
      <button data-test="goodRemoveButton" @click="removeItem">
        удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { NamedGood } from "~/types/interfaces";
import { useCartStore } from "~/stores/cart";
import { useExchangeRateStore } from "~/stores/exchangeRate";
import { useFormatCurrency } from "~/composables/useUtils";

interface Props {
  good: NamedGood
}

const props = defineProps<Props>();
const cart = useCartStore();
const count: Ref<number> = ref(1);
const exchangeRateStore = useExchangeRateStore();

// пересчитываем цену по общему курсу
const price: Ref<number> = computed(() => useFormatCurrency(props.good.C, exchangeRateStore.exchangeRate));

const amount = computed(() => count.value * price.value);

const countSum = (newCount: number) => {
  count.value = newCount;
};

const removeItem = () => cart.removeGood(props.good);

watchEffect(() => {
  cart.setAmount(props.good.T, amount.value);
});
</script>

<style module>
  .name {
    width: 35%;
    text-align: left;
  }

  .count {
    width: 20%;
  }

  .price {
    width: 25%;
  }

  @media only screen and (min-width : 720px) {
    .name {
      width: 40%;
    }

    .count {
      width: 15%;
    }

    .price {
      width: 15%;
    }
  }
</style>
