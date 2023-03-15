import { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
interface ITabButton {
  onClick: () => void;
  isCurrent: boolean;
}
interface ITab {
  /**
   * Current Page Index
   */
  current: number;
  /**
   * The number of Carousel tab
   */
  n: number;
  /**
   * Carousel Event
   */
  clickEvent: (to: number) => void;
  keyEvent: Dispatch<SetStateAction<{ prev: number; current: number }>>;
}
interface ITabContainer {
  width: number;
}
const CircleSvg = styled.svg`
  &:hover {
    fill: rgb(31, 31, 31);
  }
`;
function TabButton({ onClick, isCurrent }: ITabButton) {
  return (
    <CircleSvg
      width="30"
      height="30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      fill={isCurrent ? "rgb(73, 73, 73)" : "rgb(175, 175, 175)"}
    >
      <circle cx="15" cy="15" r="8" />
    </CircleSvg>
  );
}
const TabContainer = styled.div<ITabContainer>`
  margin: 10px auto auto auto;
  padding: 0 10px;
  height: 30px;
  border-radius: 5px;
  width: ${({ width }) => width * 30}px;
  background-color: rgb(0 0 0 / 65%);
`;
export function Tab({ n, clickEvent, keyEvent, current }: ITab) {
  const keyboardFunc = ({ key }: any) => {
    if (key === "ArrowLeft")
      keyEvent(({ current }) => ({
        prev: current,
        current: current > 0 ? (current - 1) % n : n - 1,
      }));
    if (key === "ArrowRight")
      keyEvent(({ current }) => ({
        prev: current,
        current: (current + 1) % n,
      }));
  };
  const addEvent = () => window.addEventListener("keydown", keyboardFunc);
  const removeEvent = () => window.removeEventListener("keydown", keyboardFunc);
  return (
    <TabContainer
      width={n}
      tabIndex={0}
      onFocus={addEvent}
      onBlur={removeEvent}
    >
      {Array.from({ length: n }).map((_, i) => (
        <TabButton
          key={i}
          onClick={() => clickEvent(i)}
          isCurrent={i === current}
        />
      ))}
    </TabContainer>
  );
}
