import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import styled from "@emotion/styled";

interface IPages {
  children: ReactNode;
  current: number;
  n: number;
}
interface ITab {
  n: number;
  tabEvent: Dispatch<SetStateAction<number>>;
}
const Container = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

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
  & > * {
    width: 100%;
    list-style: none;
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
  const [current, setCurrent] = useState(0);
  const [temporaryPause, setTemporaryPause] = useState(false);
  const [play, setPlay] = useState(true);
  const trickChildren = [children.at(-1), ...children, children.at(0)];
  const totalPage = trickChildren.length;
  useEffect(() => {
    if (play && !temporaryPause) {
      const timer = setInterval(() => {
        setCurrent((current) => (current + 1) % totalPage);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [play, temporaryPause]);
  return (
    <Container aria-roledescription="carousel" aria-label={name}>
      <Controller>
        <button
          aria-label="Stop automatic slide show"
          onClick={() => setPlay(!play)}
        >
          {!play ? "Play" : "Stop"}
        </button>
        <Tab n={totalPage} tabEvent={setCurrent} />
      </Controller>
      <Pages
        tabIndex={0}
        current={current}
        n={totalPage}
        onFocus={() => setTemporaryPause(true)}
        onBlur={() => setTemporaryPause(false)}
      >
        {trickChildren}
      </Pages>
    </Container>
  );
}
