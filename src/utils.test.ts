import { getConvertRate, convertSum } from "./utils";
import { Currencies } from "./types";
import { RATES } from "./mockedApiResponse";

describe("src/utils.ts", () => {
  it("getConvertRate: correctly convert USD to EUR", () => {
    const convertRate = getConvertRate(
      Currencies.USD,
      Currencies.EUR,
      RATES.rates
    );

    expect(convertRate).toEqual(RATES.rates[Currencies.EUR]);
  });

  it("getConvertRate: correctly convert GBP to EUR", () => {
    const convertRate = getConvertRate(
      Currencies.GBP,
      Currencies.EUR,
      RATES.rates
    );

    expect(convertRate).toEqual(1.1250001562501952);
  });

  it("getConvertRate: correctly convert EUR to USD", () => {
    const convertRate = getConvertRate(
      Currencies.EUR,
      Currencies.USD,
      RATES.rates
    );

    expect(convertRate).toEqual(1.1111123456803842);
  });

  it("convertSum: correctly convert 5 USD to EUR", () => {
    const convertRate = convertSum(
      5,
      Currencies.USD,
      Currencies.EUR,
      RATES.rates
    );

    expect(convertRate).toEqual(4.5);
  });

  it("convertSum: correctly convert 9000 GBP to EUR", () => {
    const convertRate = convertSum(
      9000,
      Currencies.GBP,
      Currencies.EUR,
      RATES.rates
    );

    expect(convertRate).toEqual(10125);
  });

  it("convertSum: correctly convert 0.19999 EUR to USD", () => {
    const convertRate = convertSum(
      0.19999,
      Currencies.EUR,
      Currencies.USD,
      RATES.rates
    );

    expect(convertRate).toEqual(0.22);
  });

  it("convertSum: correctly returns undefined when no rates", () => {
    const convertRate = convertSum(
      1,
      Currencies.EUR,
      Currencies.USD,
      undefined
    );

    expect(convertRate).toEqual(undefined);
  });
});
