import React, { useCallback } from "react";
import useInterval from "use-interval";

import { Arrow, ExchangeRate, Balance, Button } from "../../components";
import { useStore } from "../../store";
import { REQUEST_REPEAT_TIME, CURRENCY_OPTIONS, API_PATH } from "../../consts";
import { convertSum } from "../../utils";
import { Currencies, ExchangeDirection } from "../../types";

import {
  StyledLogo,
  CurrencyInputs,
  AppWrapper,
  ArrowWrapper,
  CurrencyWrapper,
  StyledArrowButton,
  StyledSelect,
  StyledTextInput,
  Title,
} from "./styles";

export const Home = () => {
  const set = useStore((state) => state.set);
  const setRates = useStore((state) => state.setRates);
  const rates = useStore((state) => state.rates);
  const balances = useStore((state) => state.balance);
  const setBalance = useStore((state) => state.setBalance);
  const formState = useStore((state) => state.formState);

  const isReversedDirection = formState.direction === ExchangeDirection.Reverse;
  const isDirectDirection = formState.direction === ExchangeDirection.Direct;

  const fromBalance = balances.find(
    (item) => formState.fromCurrency === item.currency
  );
  const toBalance = balances.find(
    (item) => formState.toCurrency === item.currency
  );

  const isExceedFromBalance =
    isDirectDirection && formState.fromAmount > (fromBalance?.amount || 0);
  const isExceedToBalance =
    isReversedDirection && formState.toAmount > (toBalance?.amount || 0);

  const isDisabledExchangeButton =
    isExceedFromBalance ||
    isExceedToBalance ||
    !formState.toAmount ||
    !formState.fromAmount;

  const handleChageExchangeDirection = () =>
    set((state) => {
      state.formState.direction =
        state.formState.direction === ExchangeDirection.Direct
          ? ExchangeDirection.Reverse
          : ExchangeDirection.Direct;
    });

  useInterval(
    async () => {
      const response = await fetch(API_PATH);
      const res = await response.json();
      setRates(res.rates);
    },
    REQUEST_REPEAT_TIME,
    true
  );

  const handleChangeFromCurrency = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      set((state) => {
        const fromCurrency = e.target.value as Currencies;
        state.formState.fromCurrency = e.target.value as Currencies;

        const toValue = convertSum(
          formState.fromAmount || 0,
          fromCurrency,
          formState.toCurrency,
          rates
        );

        state.formState.toAmount = toValue || "";
      });
    },
    [formState.fromAmount, formState.toCurrency, rates, set]
  );

  const handleChangeToCurrency = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      set((state) => {
        const toCurrency = e.target.value as Currencies;
        state.formState.toCurrency = toCurrency;

        const fromValue = convertSum(
          formState.toAmount || 0,
          toCurrency,
          formState.fromCurrency,
          rates
        );

        state.formState.fromAmount = fromValue || "";
      });
    },
    [formState.fromCurrency, formState.toAmount, rates, set]
  );

  const handleChangeFromAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fromValue = Number(parseFloat(e.target.value).toFixed(2));
      const toValue = convertSum(
        fromValue,
        formState.fromCurrency,
        formState.toCurrency,
        rates
      );

      set((state) => {
        state.formState.fromAmount = fromValue || "";
        state.formState.toAmount = toValue || "";
      });
    },
    [formState.fromCurrency, formState.toCurrency, rates, set]
  );

  const handleChangeToAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const toValue = Number(parseFloat(e.target.value).toFixed(2));
      const fromValue = convertSum(
        toValue,
        formState.toCurrency,
        formState.fromCurrency,
        rates
      );

      set((state) => {
        state.formState.fromAmount = fromValue || "";
        state.formState.toAmount = toValue || "";
      });
    },
    [formState.toCurrency, formState.fromCurrency, rates, set]
  );

  const handleExchange = useCallback(() => {
    setBalance(
      formState.fromAmount || 0,
      formState.toAmount || 0,
      formState.fromCurrency,
      formState.toCurrency,
      formState.direction
    );
  }, [setBalance, formState]);

  return (
    <>
      <StyledLogo data-testid="logo" />
      <Title>
        {isReversedDirection
          ? `Buy ${formState.fromCurrency}`
          : `Sell ${formState.fromCurrency}`}
      </Title>
      <AppWrapper data-testid="app-wrapper">
        <CurrencyInputs>
          <div>
            <CurrencyWrapper>
              <StyledSelect
                required
                selectedValue={formState.fromCurrency}
                options={CURRENCY_OPTIONS}
                onChange={handleChangeFromCurrency}
                data-testid="from-currency"
              />
              <Balance
                currency={formState.fromCurrency}
                data-testid="from-balance"
              />
            </CurrencyWrapper>
            <StyledTextInput
              type="number"
              min="0"
              value={formState.fromAmount}
              required
              onChange={handleChangeFromAmount}
              isExceedBalance={isExceedFromBalance}
              data-testid="from-amount"
            />
          </div>
          <StyledArrowButton
            data-testid="change-direction"
            onClick={handleChageExchangeDirection}
          >
            <ArrowWrapper>
              <Arrow isReversed={isReversedDirection} />
            </ArrowWrapper>
          </StyledArrowButton>
          <div>
            <CurrencyWrapper>
              <StyledSelect
                required
                selectedValue={formState.toCurrency}
                options={CURRENCY_OPTIONS}
                onChange={handleChangeToCurrency}
                data-testid="to-currency"
              />
              <Balance
                currency={formState.toCurrency}
                data-testid="to-balance"
              />
            </CurrencyWrapper>
            <StyledTextInput
              type="number"
              min="0"
              value={formState.toAmount}
              required
              onChange={handleChangeToAmount}
              isExceedBalance={isExceedToBalance}
              data-testid="to-amount"
            />
          </div>
        </CurrencyInputs>
        <ExchangeRate
          data-testid="exchange-rate"
          from={formState.fromCurrency}
          to={formState.toCurrency}
        />
        <Button
          data-testid="exchange-button"
          onClick={handleExchange}
          disabled={isDisabledExchangeButton}
        >
          {isReversedDirection
            ? `Buy ${formState.fromCurrency} with ${formState.toCurrency}`
            : `Sell ${formState.fromCurrency} for ${formState.toCurrency}`}
        </Button>
      </AppWrapper>
    </>
  );
};
