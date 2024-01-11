import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CommentList from "..";
import {
  testPostId,
  useCommentListMockReturnData,
} from "../../../__mocks__/mockData";
import useCommentList from "../hooks/useCommentList";

jest.mock("../hooks/useCommentList");
const useCommentListMock = useCommentList as jest.Mock;

const testId = "comment-list";
describe("CommentList", function () {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  beforeAll(() => jest.resetAllMocks());

  it("should display empty comment list", async function () {
    useCommentListMock.mockReturnValueOnce(
      useCommentListMockReturnData({ comments: [] })
    );
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
    useCommentListMock.mockReturnValueOnce(useCommentListMockReturnData());
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
