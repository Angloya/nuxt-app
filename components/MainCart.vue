<template>
  <section :class="$style.cart" data-test="mainCart">
    <div :class="$style.title">
      Корзина
    </div>
    <div
      v-if="isEmpty"
      :class="$style.empty"
      data-test="cartEmpty"
    >
      Ваша корзина пока пуста
    </div>

    <CartTable
      v-else
      :goods="cartStore.cart"
      data-test="cartTable"
    />
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const isEmpty = computed(() => !cartStore.cart.length);
</script>

<style module>
.cart {
  margin-top: 20px;
  border: 1px solid black;
}

.title {
  padding: 8px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  background: bisque;
}

.empty {
  padding: 8px;
}
</style>
