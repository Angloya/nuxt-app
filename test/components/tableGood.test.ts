import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import TableGood from "~/components/TableGood.vue";
import UIExchangePrice from "~/components/UI/ExchangePrice.vue";
import { useCartStore } from "~/stores/cart";
import { StubGood } from "~/test/mocks/goods";
import { InitialCartState } from "~/test/mocks/store";
import { InitialState, NamedGood } from "~/types/interfaces";

interface componentOptions {
  props: {
    good: NamedGood
  },
  initialState?: InitialState
}

const props = {
  good: StubGood
};

describe("TableGood", () => {
  const createComponent = ({ initialState, props }: componentOptions) => {
    return shallowMount(TableGood, {
      props,
      global: {
        components: {
          UIExchangePrice
        },
        plugins: [createTestingPinia({
          initialState
        })]
      },
      stubs: ["UIExchangePrice"]
    });
  };

  it("mounts component correctly", () => {
    const wrapper = createComponent({ props });
    const tableGoodWrapper = wrapper.find("[data-test=\"tableGood\"]");

    expect(tableGoodWrapper.exists()).toBe(true);
  });

  it("check that component show data from props", () => {
    const props = {
      good: StubGood
    };
    const wrapper = createComponent({ props });
    const tableGoodText = wrapper.find("[data-test=\"tableGoodText\"]");

    expect(tableGoodText.text()).toEqual(`${StubGood.Name} (${StubGood.P})`);
  });

  it("check that item added to cart when user clicks if item is not in cart", async () => {
    const wrapper = createComponent({ props });
    const tableGood = wrapper.find("[data-test=\"tableGood\"]");
    const store = useCartStore();
    const isSelected = store.isGoodInCart(props.good.T);

    expect(isSelected).toEqual(false);

    await tableGood.trigger("click");

    expect(store.addGood).toHaveBeenCalledTimes(1);
  });

  it("check that item removed from cart when user clicks if item is in cart", async () => {
    const wrapper = createComponent({ props, initialState: InitialCartState });
    const tableGood = wrapper.find("[data-test=\"tableGood\"]");
    const store = useCartStore();
    const isSelected = store.isGoodInCart(props.good.T);

    expect(isSelected).toEqual(true);

    await tableGood.trigger("click");

    expect(store.removeGood).toHaveBeenCalledTimes(1);
  });
});
