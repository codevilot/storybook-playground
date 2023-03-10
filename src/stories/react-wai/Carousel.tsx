import React, { useEffect, useState, ReactNode } from "react";
import styled from "@emotion/styled";
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
interface ITab {
  /**
   * The number of Carousel tab
   */
  n: number;
  /**
   * Carousel Event
   */
  tabEvent: (to: number) => void;
}
interface IContainer {
  /**
   * Carousel object including prev page number and current page number
   */
  page: { prev: number; current: number };
}
const Container = styled.section<IContainer>`
  width: 100%;
  height: 100px;
  position: relative;
  overflow: hidden;
  ul > *:nth-child(-n + ${({ page }) => page.current + 1}) {
    transform: translate3d(-100%, 0, 0);
  }
  ul > *:nth-child(n + ${({ page }) => page.current + 1}) {
    transform: translate3d(100%, 0, 0);
  }
  ul > *:nth-child(${({ page }) => page.prev + 1}) {
    opacity: 1;
  }
  ul > *:nth-child(${({ page }) => page.current + 1}) {
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
`;
function Tab({ n, tabEvent }: ITab) {
  return (
    <div>
      {Array.from({ length: n }).map((_, i) => (
        <button key={i} onClick={() => tabEvent(i)}>
          a
        </button>
      ))}
    </div>
  );
}
export function Carousel({
  name,
  children,
}: {
  name?: string;
  children: JSX.Element[];
}) {
  const [page, setPage] = useState({ prev: 0, current: 0 });
  const [temporaryPause, setTemporaryPause] = useState(false);
  const [play, setPlay] = useState(true);
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
      }, 1000);
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
        <Tab n={totalPage} tabEvent={changePage} />
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
