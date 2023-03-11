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

export function Tab({ n, tabEvent }: ITab) {
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
