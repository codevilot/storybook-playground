import React from "react";
import styled from "@emotion/styled";

interface IPages {
  children: JSX.Element | JSX.Element[];
}
const Container = styled.section`
  max-width: 900px;
`;
const Tab = styled.div``;
const Pages = styled.ul<IPages>``;
function Controller() {
  return (
    <>
      <button>Stop/Play</button>
      <Tab></Tab>
    </>
  );
}

export function Carousel({
  name,
  children,
}: {
  name?: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Container aria-label={name}>
      <Controller />
      <Pages>{children}</Pages>
    </Container>
  );
}
