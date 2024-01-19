import Button from "../src/ui-library/Button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click primary",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Click secondary",
  },
};

export const DisabledPrimary = {
  args: {
    size: "primary",
    disabled: true,
    children: "Click primary",
  },
};

export const WithIcon = {
  args: {
    variant: "primary",
    children: "Search",
    icon: "search",
  },
};

export const WithIconSecondary = {
  args: {
    variant: "secondary",
    children: "Edit",
    icon: "edit",
  },
};
