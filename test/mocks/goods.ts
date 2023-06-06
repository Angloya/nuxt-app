import { NamedGood, SortedGroups, Group } from "~/types/interfaces";

export const StubGood: NamedGood = {
  B: false,
  C: 158,
  CV: null,
  G: 1,
  P: 1,
  Pl: null,
  T: 1,
  Name: "Совершенный код. Стив Макконнелл.",
  Category: "Книги",
  Amount: 0
};

export const StubGroup: Group = {
  Name: "Книги",
  Goods: [StubGood]
};

export const StubGroupWithoutGoods: Group = {
  Name: "Книги",
  Goods: []
};

export const StubGroups: SortedGroups = {
  1: StubGroup,
  2: StubGroup
};

export const StubGroupsWithoutGoods: SortedGroups = {
  1: StubGroupWithoutGoods,
  2: StubGroupWithoutGoods
};
