import { describe, expect, it } from "vitest";
import { useParsePrice, useFormatCurrency } from "~/composables/useUtils";
describe("useUtils", () => {
  it.each`
  price | expected
  ${71.0000001} | ${71}
  ${71.0703801} | ${71.07}
  ${71.00} | ${71}
  ${73} | ${73}
`("useParsePrice return correct value", ({ price, expected }) => {
    expect(useParsePrice(price)).toEqual(expected);
  });

  it.each`
  price | expected | exchangeRate
  ${71.0000001} | ${5680} | ${80}
  ${71.0703801} | ${3979.94} | ${56}
  ${71.00} | ${3763} | ${53}
  ${73} | ${3723} | ${51}
`("useFormatCurrency return correct value", ({ price, expected, exchangeRate }) => {
    expect(useFormatCurrency(price, exchangeRate)).toEqual(expected);
  });
});
