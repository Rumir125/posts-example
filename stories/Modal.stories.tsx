import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/ui-library";
import Modal from "../src/ui-library/Modal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicModal: Story = {
  args: {
    children: (
      <div
        style={{
          display: "flex",
          height: "100%",
          padding: "16px",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          rowGap: "8px",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Modal title</h3>
        </div>
        <div
          style={{
            flex: 3,
            border: "1px solid grey",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <p>Body</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary">Do something</Button>
        </div>
      </div>
    ),
    open: true,
    popupProps: { style: { borderRadius: "10px" } },
  },
};
