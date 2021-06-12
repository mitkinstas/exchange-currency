import { VFC } from "react";
import styled from "styled-components/macro";

interface ArrowProps {
  color?: string;
  isReversed?: boolean;
}

const StyledSVG = styled.svg<ArrowProps>`
  transition: all 150ms ease-out;
  transform: ${({ isReversed }) =>
    isReversed ? "rotate(180deg)" : "rotate(0)"};
`;

export const Arrow: VFC<ArrowProps> = ({
  color = "#000",
  isReversed,
  ...rest
}) => {
  return (
    <StyledSVG
      isReversed={isReversed}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path fill={color} d="M24 12l-9-9v7h-15v4h15v7z" />
    </StyledSVG>
  );
};
