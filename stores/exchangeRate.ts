import { defineStore } from "pinia";

interface StateShape {
  exchangeRate: number
}

export const useExchangeRateStore = defineStore({
  id: "exchange-rate",
  state: (): StateShape => {
    return {
      exchangeRate: 71
    };
  },
  actions: {
    setExchangeRate (newValue: number) {
      this.exchangeRate = newValue;
    }
  }
});
