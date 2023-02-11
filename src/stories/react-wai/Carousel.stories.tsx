import React from "react";
import { Carousel } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
  args: {},
};

const Template = () => (
  <Carousel name="carousel">
    <li>
      <h2>first page</h2>
    </li>
    <li>
      <h2>second page</h2>
    </li>
  </Carousel>
);

export const Default = Template.bind({});
