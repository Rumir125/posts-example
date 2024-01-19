import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
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
    popupProps: { style: { borderRadius: "10px" } },
  },
  render: (args) => {
    const [modalOpen, setModalOpen] = React.useState(false);

    return (
      <div>
        <div>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
        </div>
        <Modal {...args} open={modalOpen} onClose={() => setModalOpen(false)}>
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              boxSizing: "border-box",
              rowGap: "8px",
            }}
          >
            <div>
              <h2 style={{ textAlign: "center" }}>Title</h2>
            </div>
            <div
              style={{
                flex: 1,
                border: "1px solid grey",
                borderRadius: "8px",
                padding: "12px",
                color: "grey",
              }}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam officia vel fugit doloremque! Sunt eaque ad veniam
                optio quibusdam sapiente assumenda quis enim quidem eligendi
                accusamus nemo iste, consequatur corporis.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Apply
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
