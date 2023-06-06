import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MainTable from "~/components/MainTable.vue";
import TableGood from "~/components/TableGood.vue";
import UIAccordionItem from "~/components/UI/AccordionItem.vue";
import { SortedGroups } from "~/types/interfaces";
import { StubGroups } from "~/test/mocks/goods";

interface componentOptions {
  props: {
    groups: SortedGroups
  }
}

describe("MainTable", () => {
  const createComponent = ({ props }: componentOptions) => {
    return shallowMount(MainTable, {
      props: {
        groups: props.groups
      },
      global: {
        components: {
          TableGood,
          UIAccordionItem
        }
      },
      stubs: ["TableGood", "UIAccordionItem"]
    });
  };

  it("mounts component correctly", () => {
    const props = {
      groups: StubGroups
    };
    const wrapper = createComponent({ props });
    const mainTableWrapper = wrapper.find("[data-test=\"wrapperMainTable\"]");

    expect(mainTableWrapper.exists()).toBe(true);
  });

  it("renders right count of UIAccordionItem from props", () => {
    const props = {
      groups: StubGroups
    };
    const wrapper = createComponent({ props });
    const uiAccordionItems = wrapper.findAll("[data-test=\"mainTableAccordion\"]");
    const stubGroupLength = Object.keys(props.groups).length;

    expect(uiAccordionItems.length).toEqual(stubGroupLength);
  });
});
