import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CartInputCount from "~/components/Cart/InputCount.vue";
import CartGood from "~/components/Cart/CartGood.vue";
import { useCartStore } from "~/stores/cart";
import { StubGood } from "~/test/mocks/goods";
import { InitialState, NamedGood } from "~/types/interfaces";
import { useExchangeRateStore } from "~/stores/exchangeRate";
import { useFormatCurrency } from "~/composables/useUtils";
import { InitialCartState } from "~/test/mocks/store";

interface componentOptions {
  props: {
    good: NamedGood
  },
  initialState?: InitialState
}

const props = {
  good: StubGood
};

describe("CartGood", () => {
  const createComponent = ({ initialState, props }: componentOptions) => {
    return shallowMount(CartGood, {
      props,
      global: {
        components: {
          CartInputCount
        },
        plugins: [createTestingPinia({
          initialState
        })]
      },
      stubs: ["CartInputCount"]
    });
  };

  it("mounts component correctly", () => {
    const wrapper = createComponent({ props });
    const cartGoodWrapper = wrapper.find("[data-test=\"cartGood\"]");

    expect(cartGoodWrapper.exists()).toBe(true);
  });

  it("check that component show data from props", () => {
    const props = {
      good: StubGood
    };
    const wrapper = createComponent({ props });
    const goodName = wrapper.find("[data-test=\"goodName\"]");
    const goodPrice = wrapper.find("[data-test=\"goodPrice\"]");
    const store = useExchangeRateStore();
    const exchangePrice = useFormatCurrency(props.good.C, store.exchangeRate);

    expect(goodName.text()).toEqual(`${StubGood.Category}. ${StubGood.Name}`);
    expect(goodPrice.text()).toEqual(`${exchangePrice} ₽ / шт.`);
  });

  it("check that item removed from cart when user clicks remove", async () => {
    const props = {
      good: StubGood
    };
    const wrapper = createComponent({ props, initialState: InitialCartState });
    const goodRemoveButton = wrapper.find("[data-test=\"goodRemoveButton\"]");
    const store = useCartStore();

    await goodRemoveButton.trigger("click");

    expect(store.removeGood).toHaveBeenCalledTimes(1);
  });
});
