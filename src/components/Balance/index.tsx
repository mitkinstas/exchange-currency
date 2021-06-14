import { VFC } from "react";
import styled from "styled-components";

import { useStore } from "../../store";
import { Currencies } from "../../types";

interface BalanceProps {
  currency: Currencies;
}

const StyledBalance = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

export const Balance: VFC<BalanceProps> = ({ currency, ...rest }) => {
  const balances = useStore((state) => state.balance);

  const currencyBalance = balances.find((item) => item.currency === currency);
  return (
    <StyledBalance {...rest}>
      Balance: {currencyBalance?.amount.toFixed(2) || 0} {currency}
    </StyledBalance>
  );
};
