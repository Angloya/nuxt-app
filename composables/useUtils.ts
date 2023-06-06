// возвращает конвертированное значение цены
export function useFormatCurrency (price: number, exchangeRate:number): number {
  return useParsePrice(price * exchangeRate);
}

export function useParsePrice (price: number): number {
  return parseFloat((price).toFixed(2));
}

// возвращает рандомное значение в заданном диапазоне
export function useRandomNumber (min: number, max: number): number {
  const randomValue = Math.random() * (max - min) + min;
  return Math.floor(randomValue);
}
