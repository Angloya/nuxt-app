import { InitialState } from "~/types/interfaces";
import { StubGood } from "~/test/mocks/goods";

export const InitialCartState: InitialState = {
  "cart-store": {
    cart: [StubGood]
  }
};
