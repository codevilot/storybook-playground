import React from "react";
import { Carousel } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
  args: {},
};

const Template = () => <Carousel name="carousel"></Carousel>;

export const Default = Template.bind({});
