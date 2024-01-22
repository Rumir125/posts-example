import type { Meta, StoryObj } from "@storybook/react";
import { ListComponent } from "../src/ui-library";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/ListComponent",
  component: ListComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    noDataMessage: { control: "text" },
  },
} satisfies Meta<typeof ListComponent>;

type Story = StoryObj<typeof ListComponent>;
const testItem = {
  id: 2,
  name: "Jim",
  email: "test@mail",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ad cupiditate omnis rem. Ex excepturi ipsum facere nostrum vel minus, modi soluta rem voluptatum eum necessitatibus atque exercitationem repellendus molestiae.",
};

export const BasicList: Story = {
  args: {
    data: [
      { id: 1, name: "name", email: "email", body: "body" },
      testItem,
      { ...testItem, id: 3 },
      { ...testItem, id: 4 },
    ],
  },
  render: (args) => {
    return (
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "1px solid grey",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <ListComponent
          itemKey="id"
          data={args.data}
          loadingData={false}
          renderItem={(comment) => (
            <article style={{ border: "1px solid grey", padding: "12px" }}>
              <h4>{comment.name}</h4>
              <p>{comment.email}</p>
              <p>{comment.body}</p>
            </article>
          )}
          noDataMessage={args.noDataMessage}
        />
      </div>
    );
  },
};

export const EmptyList: Story = {
  args: { data: [] },
  render: (args) => {
    return (
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "1px solid grey",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <ListComponent
          itemKey="id"
          data={args.data}
          loadingData={false}
          renderItem={(comment) => (
            <article style={{ border: "1px solid grey", padding: "12px" }}>
              <h4>{comment.name}</h4>
              <p>{comment.email}</p>
              <p>{comment.body}</p>
            </article>
          )}
          noDataComponent={
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>No data</h3>
            </div>
          }
          noDataMessage={args.noDataMessage}
        />
      </div>
    );
  },
};

export const EmptyListNoDataMessage: Story = {
  args: {
    noDataMessage: "No information found",
    data: [],
  },
  render: (args) => {
    return (
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "1px solid grey",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <ListComponent
          itemKey="id"
          data={args.data}
          loadingData={false}
          renderItem={(comment) => (
            <article style={{ border: "1px solid grey", padding: "12px" }}>
              <h4>{comment.name}</h4>
              <p>{comment.email}</p>
              <p>{comment.body}</p>
            </article>
          )}
          noDataMessage={args.noDataMessage}
        />
      </div>
    );
  },
};
