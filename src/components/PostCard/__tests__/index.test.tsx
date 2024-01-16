import PostCard from "..";
import { testPost } from "../../../__mocks__/mockData";

import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const testId = "post-card";

jest.mock("../hooks/usePostCard", () => {
  return {
    usePostCard: () => ({
      handleClickDetails: () => {},
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
        />
      );
    });
    expect(screen.queryByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText(testPost.title)).toBeInTheDocument();
    expect(screen.getByText(testPost.userName)).toBeInTheDocument();

    expect(console.log).toHaveBeenCalledWith("Hello component PostCard");
  });
});
