import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CommentList from "..";
import useCommentList from "../hooks/useCommentList";

jest.mock("../hooks/useCommentList");

const testId = "comment-list";
describe("CommentList", function () {
  let testPostId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  beforeAll(() => jest.resetAllMocks());

  it("should display empty comment list", async function () {
    (useCommentList as jest.Mock).mockReturnValueOnce({
      comments: [],
      loadingComments: false,
      error: null,
    });
    act(() => {
      render(
        <CommentList
          propsMessage="Hello component"
          testId={testId}
          postId={testPostId}
        />
      );
    });
    expect(screen.getByTestId(`${testId}-no-data`)).toBeInTheDocument();
    expect(screen.getByText("No comments")).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith("Hello component CommentList");
  });

  it("should display comment list with one comment", async function () {
    (useCommentList as jest.Mock).mockReturnValueOnce({
      comments: [
        {
          postId: 1,
          id: 1,
          name: "comment",
          email: "test@mail",
          body: "test message",
        },
      ],
      loadingComments: false,
      error: null,
    });
    act(() => {
      render(
        <CommentList
          propsMessage="Hello component"
          testId={testId}
          postId={testPostId}
        />
      );
    });

    expect(screen.queryByTestId(`${testId}-no-data`)).not.toBeInTheDocument();
    expect(screen.queryByTestId("No comments")).not.toBeInTheDocument();
  });
});
