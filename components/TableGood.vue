<template>
  <div
    :class="goodClassNames"
    data-test="tableGood"
    @click="addToCart"
  >
    <div :class="$style.name" data-test="tableGoodText">
      {{ props.good.Name }} ({{ props.good.P }})
    </div>

    <UIExchangePrice :price="props.good.C" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { NamedGood } from "~/types/interfaces";
import { useCartStore } from "~/stores/cart";

interface Props {
  good: NamedGood
}

const props = defineProps<Props>();

const cart = useCartStore();

const addToCart = () => {
  if (isSelected.value) {
    cart.removeGood(props.good);
  } else {
    cart.addGood(props.good);
  }
};

const { isGoodInCart } = storeToRefs(cart);

const style = useCssModule();

const goodClassNames = computed(() => ({
  [style.good]: true,
  [style.good_selected]: isSelected.value
}));

const isSelected = computed(() => isGoodInCart.value(props.good.T));
</script>

<style module>
.good {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.good_selected {
  background: bisque;
}

.name {
  flex-grow: 1;
  padding: 8px;
  border-right: 1px solid black;
}
</style>
