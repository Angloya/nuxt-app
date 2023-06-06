import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import MainCart from "~/components/MainCart.vue";
import CartTable from "~/components/Cart/CartTable.vue";
import { useCartStore } from "~/stores/cart";
import { InitialCartState } from "~/test/mocks/store";
import { InitialState } from "~/types/interfaces";

interface componentOptions {
  initialState?: InitialState
}

describe("MainCart", () => {
  const createComponent = ({ initialState }: componentOptions = {}) => {
    return shallowMount(MainCart, {
      global: {
        components: {
          CartTable
        },
        plugins: [createTestingPinia({
          initialState
        })]
      },
      stubs: ["CartTable"]
    });
  };

  it("mounts component correctly", () => {
    const wrapper = createComponent();
    const mainTableWrapper = wrapper.find("[data-test=\"mainCart\"]");

    expect(mainTableWrapper.exists()).toBe(true);
  });

  it("renders empty message if there are no goods in cart", () => {
    const store = useCartStore();
    const wrapper = createComponent();
    const cartEmptyBlock = wrapper.find("[data-test=\"cartEmpty\"]");
    const isEmptyCart = !store.cart.length;

    expect(isEmptyCart).toEqual(true);
    expect(cartEmptyBlock.text()).toEqual("Ваша корзина пока пуста");
  });

  it("renders CartTable if there are goods in cart", () => {
    const wrapper = createComponent({ initialState: InitialCartState });
    const store = useCartStore();
    const cartTable = wrapper.find("[data-test=\"cartTable\"]");
    const isNotEmptyCart = !!store.cart.length;

    expect(isNotEmptyCart).toEqual(true);
    expect(cartTable.exists()).toBe(true);
  });
});
