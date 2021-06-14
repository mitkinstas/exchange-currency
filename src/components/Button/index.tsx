import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components/macro";

const StyledButton = styled.button`
  font-size: 1.2rem;
  height: 2.4rem;
  background-color: #3182ce;
  font-family: "Inter", sans-serif;
  color: #fff;
  border: none;
  border-radius: 0.3rem;
  outline: none;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #7da9d1;
    cursor: default;
  }

  &:hover {
    background-color: #2b6bb0;

    &:disabled {
      background-color: #7da9d1;
    }
  }

  &:active {
    box-shadow: #c3daf7 0 0 0 0.2rem;
  }

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
