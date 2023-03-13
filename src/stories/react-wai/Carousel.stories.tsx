import React from "react";
import { Carousel } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
  args: {},
};

const Template = () => (
  <Carousel name="carousel" delay={1000}>
    <li>
      <h2>1 page</h2>
      11111111111
      <input type="text" />
    </li>
    <li>
      <h2>2 page</h2>
      2222222222
    </li>
    <li>
      <h2>3 page</h2>
      33333333333
    </li>
    <li>
      <h2>4 page</h2>
      444444444
    </li>
  </Carousel>
);

export const Default = Template.bind({});
