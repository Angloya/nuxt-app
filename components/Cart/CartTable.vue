<template>
  <div :class="$style.table" data-test="cartTable">
    <div :class="$style.cell">
      <div :class="$style.name">
        Наименование товара и описание
      </div>
      <div :class="$style.count">
        Количество
      </div>
      <div :class="$style.price">
        Цена
      </div>
    </div>

    <CartGood
      v-for="good in props.goods"
      :key="good.T"
      :good="good"
      :class="$style.cell"
      data-test="cartGood"
    />

    <div :class="$style.amount" data-test="cartTableAmount">
      {{ amount }} ₽
    </div>
  </div>
</template>

<script setup lang="ts">
import { NamedGood } from "~/types/interfaces";
import { useCartStore } from "~/stores/cart";
import { useParsePrice } from "~/composables/useUtils";

interface Props {
  goods: NamedGood[]
}

const props = defineProps<Props>();
const cart = useCartStore();

const amount = computed(() => useParsePrice(cart.getCommonAmount));
</script>

<style module>
.table {
  display: flex;
  flex-direction: column;
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

.cell {
  display: flex;
  text-align: center;
  padding: 8px;
  border-bottom: 1px solid black;
}

.name {
  width: 35%;
  text-align: left;
}

.cell:last-child {
  border-bottom: 0;
}

.count {
  width: 20%;
}

.price {
  width: 25%;
}

.amount {
  padding: 8px;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}
</style>
