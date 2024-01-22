import type { Meta, StoryObj } from "@storybook/react";
import { Option, SearchSelect } from "../src/ui-library";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/SearchSelect",
  component: SearchSelect,
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
} satisfies Meta<typeof SearchSelect>;

type Story = StoryObj<typeof SearchSelect>;

const testUser = {
  id: 1,
  name: "John Doe",
  userName: "john123",
  email: "test@mail.com",
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicSearchSelect: Story = {
  args: {
    placeholder: "Search posts by user name...",
    inputProps: { name: "searchText", autoComplete: "off" },
  },
  render: (args) => {
    const users = [
      testUser,
      { ...testUser, id: 2, name: "Jane Doe" },
      { ...testUser, id: 3, name: "John Smith" },
    ];

    return (
      <SearchSelect placeholder={args.placeholder} inputProps={args.inputProps}>
        {users.map((user) => (
          <Option key={user.id} value={user.name}>
            {user.name}
          </Option>
        ))}
      </SearchSelect>
    );
  },
};
