<template>
  <section data-test="wrapperMainTable">
    <div :class="$style.groups">
      <UIAccordionItem
        v-for="(group, groupId) in props.groups"
        :key="groupId"
        :title="group.Name"
        :class="$style.group"
        data-test="mainTableAccordion"
      >
        <template v-if="group.Goods.length">
          <TableGood
            v-for="good in group.Goods"
            :key="good.T"
            :good="good"
            :class="$style.good"
            data-test="mainTableGood"
          />
        </template>

        <div
          v-else
          :class="$style.emptyGroup"
          data-test="mainTableEmptyGroup"
        >
          В данной категории нет товаров
        </div>
      </UIAccordionItem>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SortedGroups } from "~/types/interfaces";

interface Props {
  groups: SortedGroups
}

const props = defineProps<Props>();
</script>

<style module>
.groups {
  display: flex;
  flex-wrap: wrap;
}

.good {
  border-bottom: 1px solid black;
}

.emptyGroup {
  padding: 8px;
  border-bottom: 1px solid black;
}
</style>
