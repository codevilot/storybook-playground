import React, { useEffect, useState, ReactNode } from "react";
import styled from "@emotion/styled";
import { Tab } from "./CarouselTab";
interface IPages extends IContainer {
  /**
   * It determines Carousel Page
   */
  children: ReactNode;
  /**
   * The number of Carousel
   */
  n: number;
}

interface IContainer {
  /**
   * Carousel object including prev page number and current page number
   */
  page: { prev: number; current: number };
}

interface ICarousel {
  name?: string;
  delay?: number;
  auto?: boolean;
  children: JSX.Element[];
}
const Container = styled.section<IContainer>`
  width: 100%;
  height: 100px;
  position: relative;
  overflow: hidden;
  ul > *:nth-of-type(-n + ${({ page }) => page.current + 1}) {
    transform: translate3d(-100%, 0, 0);
  }
  ul > *:nth-of-type(n + ${({ page }) => page.current + 1}) {
    transform: translate3d(100%, 0, 0);
  }
  ul > *:nth-of-type(${({ page }) => page.prev + 1}) {
    opacity: 1;
  }
  ul > *:nth-of-type(${({ page }) => page.current + 1}) {
    opacity: 1;
    transform: translate3d(0%, 0, 0);
  }
  ul > * {
    transition: 1s transform;
  }
`;

const Pages = styled.ul<IPages>`
  margin: 0;
  padding: 0;
  width: 100%;

  flex-direction: row;

  & > * {
    width: 100%;
    opacity: 0;
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:focus {
    border: 1px solid blue;
  }
`;
const Controller = styled.div`
  position: absolute;
  z-index: 1;
  & button:first-of-type {
    float: left;
  }
  width: 100%;
  text-align: center;
`;

export function Carousel({ name, children, delay, auto }: ICarousel) {
  const [page, setPage] = useState({ prev: 0, current: 0 });
  const [temporaryPause, setTemporaryPause] = useState(false);
  const [play, setPlay] = useState(auto !== false ?? true);
  const totalPage = children.length;
  const changePage = (to: number) =>
    setPage(({ current }) => ({
      prev: current,
      current: to % totalPage,
    }));

  useEffect(() => {
    if (play && !temporaryPause) {
      const timer = setInterval(() => {
        setPage(({ current }) => ({
          prev: current,
          current: (current + 1) % totalPage,
        }));
      }, delay ?? 5000);
      return () => clearInterval(timer);
    }
  }, [play, temporaryPause]);
  return (
    <Container page={page} aria-roledescription="carousel" aria-label={name}>
      <Controller>
        <button
          aria-label="Stop automatic carousel show"
          onClick={() => setPlay(!play)}
        >
          {!play ? "▷" : "∥"}
        </button>
        <Tab n={totalPage} tabEvent={changePage} current={page.current} />
      </Controller>
      <Pages
        tabIndex={0}
        n={totalPage}
        page={page}
        onFocus={() => setTemporaryPause(true)}
        onBlur={() => setTemporaryPause(false)}
      >
        {children}
      </Pages>
    </Container>
  );
}
