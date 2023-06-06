import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import UIExchangePrice from "~/components/UI/ExchangePrice.vue";
import { useExchangeRateStore } from "~/stores/exchangeRate";
import { useFormatCurrency } from "~/composables/useUtils";

interface componentOptions {
  props: {
    price: number
  },
}

describe("ExchangePrice", () => {
  const createComponent = ({ props }: componentOptions) => {
    return shallowMount(UIExchangePrice, {
      props,
      global: {
        plugins: [createTestingPinia()]
      }
    });
  };

  it("mounts component correctly", () => {
    const props = {
      price: 71
    };
    const wrapper = createComponent({ props });
    const exchangePriceWrapper = wrapper.find("[data-test=\"exchangePrice\"]");

    expect(exchangePriceWrapper.exists()).toBe(true);
  });

  it("check that uses correct exchangeRate", () => {
    const props = {
      price: 71
    };
    const wrapper = createComponent({ props });
    const exchangePriceWrapper = wrapper.find("[data-test=\"exchangePrice\"]");
    const store = useExchangeRateStore();
    const exchangePrice = useFormatCurrency(props.price, store.exchangeRate);

    expect(exchangePriceWrapper.text()).toEqual(`${exchangePrice} ₽`);
  });
});
