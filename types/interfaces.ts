export interface NameItem {
  N: string,
  T: number | string
}

export interface NamesType {
  [key: string]: NameItem
}

export interface NamesList {
  G: string;
  C?: number,
  B: NamesType
}

export interface NamesData {
  [key: string]: NamesList
}

export interface Good {
  B: boolean,
  C: number,
  CV?: null,
  G: number,
  P: number,
  Pl?: null,
  T: number
}

export interface GoodsList {
  Error: string,
  Id: number,
  Success: boolean,
  Value: {
    Goods: Good[],
  }
}

export interface GroupGoods {
  Name: string,
  GroupId: number,
  Goods: Good[],
}

export interface NamedGood {
  B: boolean,
  C: number,
  CV?: null,
  G: number,
  P: number,
  Pl?: null,
  T: number,
  Name: string,
  Category: string,
  Amount: number
}

export interface Group {
  Name: string,
  Goods: NamedGood[]
}

export interface SortedGroups {
  [key: string]: Group
}

export interface InitialState {
  [key: string]: {
    cart: NamedGood[]
  }
}
