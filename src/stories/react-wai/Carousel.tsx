import React, { useEffect, useState } from "react";
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
  transition: 1s all;
  transform: translate3d(
    ${({ current, n }) => `${(-current * 100) / n}%`},
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
  const totalPage = Array.isArray(children) ? children.length : 1;
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current) => (current + 1) % totalPage);
      console.log(current);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <Container aria-roledescription="carousel" aria-label={name}>
      <Controller>
        <button aria-label="Stop automatic slide show">Stop/Play</button>
        <Tab></Tab>
      </Controller>
      <Pages current={current} n={totalPage}>
        {children}
      </Pages>
    </Container>
  );
}
