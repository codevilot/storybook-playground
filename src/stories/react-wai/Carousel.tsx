import React from "react";
import styled from "@emotion/styled";

interface IPages {
  children: JSX.Element | JSX.Element[];
  current: number;
  n: number;
}
const Container = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const Tab = styled.div``;
const Pages = styled.ul<IPages>`
  margin: 0;
  padding: 0;
  display: flex;
  width: ${({ n }) => `${100 * n}%`};
  transform: translate3d(
    ${({ current, n }) => `${(current * 100) / n}%`},
    0,
    0
  );
  flex-direction: row;
  & * {
    width: 100%;
    list-style: none;
  }
`;
const Controller = styled.div`
  position: absolute;
`;

export function Carousel({
  name,
  children,
}: {
  name?: string;
  children: JSX.Element | JSX.Element[];
}) {
  let current = 1;
  return (
    <Container aria-roledescription="carousel" aria-label={name}>
      <Controller>
        <button aria-label="Stop automatic slide show">Stop/Play</button>
        <Tab></Tab>
      </Controller>
      <Pages
        current={current}
        n={Array.isArray(children) ? children.length : 1}
      >
        {children}
      </Pages>
    </Container>
  );
}
