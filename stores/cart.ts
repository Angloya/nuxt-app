import { defineStore } from "pinia";
import { NamedGood } from "~/types/interfaces";

interface StateShape {
  cart: NamedGood[]
}

export const useCartStore = defineStore({
  id: "cart-store",
  state: (): StateShape => {
    return {
      cart: []
    };
  },
  actions: {
    addGood (good: NamedGood) {
      this.cart.push(good);
    },

    removeGood (good: NamedGood) {
      const index = this.cart.findIndex((item: NamedGood) => item.T === good.T);
      this.cart.splice(index, 1);
    },

    setAmount (goodId: number, amount: number) {
      const index = this.cart.findIndex((item: NamedGood) => item.T === goodId);
      this.cart[index].Amount = amount;
    }
  },
  getters: {
    getCommonAmount: state => state.cart.reduce(
      (amount, currentValue) => amount + currentValue.Amount,
      0
    ),
    isGoodInCart: state => (goodId: number) => state.cart.some((good: NamedGood) => good.T === goodId)
  }
});
