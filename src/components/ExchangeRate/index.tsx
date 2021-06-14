import { VFC } from "react";
import styled from "styled-components";

import { useStore } from "../../store";
import { Currencies } from "../../types";
import { getConvertRate } from "../../utils";

interface ExchangeRateProps {
  from: Currencies;
  to: Currencies;
}

export const StyledExchangeRate = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: #555;
  margin: 0.4rem auto;
  justify-content: center;
`;

export const ExchangeRate: VFC<ExchangeRateProps> = ({ from, to, ...rest }) => {
  const rates = useStore((state) => state.rates);
  const convertRate = getConvertRate(from, to, rates);

  if (!from || !to || !rates || !convertRate) {
    return null;
  }
  return (
    <StyledExchangeRate {...rest}>
      1 {from} = {convertRate?.toFixed(4)} {to}
    </StyledExchangeRate>
  );
};
