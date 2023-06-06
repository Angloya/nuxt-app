import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CartTable from "~/components/Cart/CartTable.vue";
import CartGood from "~/components/Cart/CartGood.vue";
import { useCartStore } from "~/stores/cart";
import { StubGood } from "~/test/mocks/goods";
import { InitialCartState } from "~/test/mocks/store";
import { InitialState, NamedGood } from "~/types/interfaces";
import { useParsePrice } from "~/composables/useUtils";

interface componentOptions {
  props: {
    goods: NamedGood[]
  },
  initialState?: InitialState
}

const props = {
  goods: [StubGood]
};

describe("CartTable", () => {
  const createComponent = ({ initialState, props }: componentOptions) => {
    return shallowMount(CartTable, {
      props,
      global: {
        components: {
          CartGood
        },
        plugins: [createTestingPinia({
          initialState
        })]
      },
      stubs: ["CartGood"]
    });
  };

  it("mounts component correctly", () => {
    const wrapper = createComponent({ props });
    const cartGoodWrapper = wrapper.find("[data-test=\"cartTable\"]");

    expect(cartGoodWrapper.exists()).toBe(true);
  });

  it("renders right count of CartGood from props", () => {
    const wrapper = createComponent({ props });
    const cartGood = wrapper.findAll("[data-test=\"cartGood\"]");
    const stubGoodLength = props.goods.length;

    expect(cartGood.length).toEqual(stubGoodLength);
  });

  it("renders right amount from store", () => {
    const wrapper = createComponent({ props, initialState: InitialCartState });
    const cartTableAmount = wrapper.find("[data-test=\"cartTableAmount\"]");
    const store = useCartStore();

    const amount = useParsePrice(store.getCommonAmount);

    expect(cartTableAmount.text()).toEqual(`${amount} ₽`);
  });
});
