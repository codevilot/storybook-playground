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
  z-index: 1;
`;

export function Carousel({
  name,
  children,
}: {
  name?: string;
  children: JSX.Element | JSX.Element[];
}) {
  const [current, setCurrent] = useState(0);
  const [play, setPlay] = useState(true);
  const totalPage = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    if (play) {
      const timer = setInterval(() => {
        setCurrent((current) => (current + 1) % totalPage);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [play]);
  return (
    <Container aria-roledescription="carousel" aria-label={name}>
      <Controller>
        <button
          aria-label="Stop automatic slide show"
          onClick={() => setPlay(!play)}
        >
          Stop/Play
        </button>
        <Tab />
      </Controller>
      <Pages current={current} n={totalPage}>
        {children}
      </Pages>
    </Container>
  );
}
