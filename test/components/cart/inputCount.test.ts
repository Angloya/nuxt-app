import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CountInput from "~/components/Cart/InputCount.vue";

interface componentOptions {
  props?: {
    maxCount: number
  }
}

describe("CountInput", () => {
  const createComponent = ({ props }: componentOptions = {}) => {
    return shallowMount(CountInput, {
      props: {
        maxCount: props?.maxCount || 10
      }
    });
  };

  it("mounts component correctly", () => {
    const wrapper = createComponent();
    const input = wrapper.find("[data-test=\"wrapperInputCount\"]");

    expect(input.exists()).toBe(true);
  });

  it("checks that component uses props maxCount correctly", () => {
    const props = {
      maxCount: 2
    };
    const wrapper = createComponent({ props });
    const input = wrapper.find("[data-test=\"inputCount\"]");
    const inputMaxAttr = input.attributes().max;

    expect(Number(inputMaxAttr)).toEqual(props.maxCount);
  });

  it("checks that component has emit when input value was changed", async () => {
    const wrapper = createComponent();
    const input = wrapper.find("[data-test=\"inputCount\"]");
    const newCount = 10;

    await input.setValue(newCount);

    expect(wrapper.emitted()).toHaveProperty("changeCount");
    expect(wrapper.emitted().changeCount[0]).toEqual([newCount]);
  });
});
