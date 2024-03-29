import PostCard from "..";
import { testPost } from "../../../__mocks__/mockData";

import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const testId = "post-card";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("../hooks/usePostCard", () => {
  return {
    usePostCard: () => ({
      handleClickViewComments: () => {},
    }),
  };
});

describe("App", function () {
  beforeEach(() => {
    console.log = jest.fn();
  });
  it("should display Post Card with specified data", async function () {
    act(() => {
      render(
        <PostCard
          propsMessage="Hello component"
          title={testPost.title}
          userName={testPost.userName}
          postId={testPost.id}
          setCurrentPostId={() => {}}
          testId={testId}
          setModalOpen={jest.fn()}
        />
      );
    });
    expect(screen.queryByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText(testPost.title)).toBeInTheDocument();
    expect(screen.getByText(testPost.userName)).toBeInTheDocument();

    expect(console.log).toHaveBeenCalledWith("Hello component PostCard");
  });
});
