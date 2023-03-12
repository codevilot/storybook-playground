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
  tabEvent: (to: number) => void;
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
  margin: auto;
  width: ${({ width }) => width * 30}px;
  background-color: rgb(0 0 0 / 65%);
`;
export function Tab({ n, tabEvent, current }: ITab) {
  return (
    <TabContainer width={n}>
      {Array.from({ length: n }).map((_, i) => (
        <TabButton
          key={i}
          onClick={() => tabEvent(i)}
          isCurrent={i === current}
        />
      ))}
    </TabContainer>
  );
}
