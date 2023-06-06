import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import AccordionItem from "~/components/UI/AccordionItem.vue";

interface componentOptions {
  props: {
    title: string
  },
  slots?: {
    default: string
  }
}

describe("AccordionItem", () => {
  const createComponent = ({ props, slots }: componentOptions) => {
    return shallowMount(AccordionItem, {
      props: {
        title: props.title
      },
      slots
    });
  };

  it("mounts component correctly", () => {
    const props = {
      title: "Книги"
    };
    const wrapper = createComponent({ props });
    const accordion = wrapper.find("[data-test=\"accordion\"]");

    expect(accordion.exists()).toBe(true);
    expect(accordion.text()).toBe(props.title);
  });

  it("checks that clicking on the icon hides the content", async () => {
    const props = {
      title: "Книги"
    };
    const slots = {
      default: "тест слот"
    };
    const wrapper = createComponent({ props, slots });
    const accordionIcon = wrapper.find("[data-test=\"accordionTitle\"]");
    const accordionBody = wrapper.find("[data-test=\"accordionBody\"]");

    await accordionIcon.trigger("click");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(accordionBody.element.style.display).toEqual("none");
  });
});
