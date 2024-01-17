import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PostList from "..";
import {
  testPosts,
  useCommentListMockReturnData,
  usePostsMockReturnData,
} from "../../../__mocks__/mockData";
import useCommentList from "../../../components/CommentList/hooks/useCommentList";
import usePosts from "../hooks/usePosts";

jest.mock("../hooks/usePosts");
jest.mock("../../../components/PostCard/hooks/usePostCard", () => {
  return {
    usePostCard: () => ({
      handleClickDetails: () => {},
      handleClickViewComments: () => {},
    }),
  };
});
jest.mock("../../../components/CommentList/hooks/useCommentList");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));
const usePostsMock = usePosts as jest.Mock;
const useCommentListMock = useCommentList as jest.Mock;

const testId = "post-list";
describe("PostList", function () {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  beforeAll(() => jest.resetAllMocks());

  it("should display Posts list with empty comment list", async function () {
    usePostsMock.mockReturnValueOnce(
      usePostsMockReturnData({ posts: testPosts })
    );
    useCommentListMock.mockReturnValueOnce(
      useCommentListMockReturnData({ comments: [] })
    );
    act(() => {
      render(<PostList propsMessage="Hello component" testId={testId} />);
    });

    expect(
      screen.getByText("Please select a post to see comments")
    ).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-post-card-1`)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith("Hello component PostList");
  });
  it("should display empty PostList", async function () {
    usePostsMock.mockReturnValueOnce(usePostsMockReturnData());
    useCommentListMock.mockReturnValueOnce(
      useCommentListMockReturnData({ comments: [] })
    );
    act(() => {
      render(<PostList propsMessage="Hello component" testId={testId} />);
    });

    expect(
      screen.getByText("Please select a post to see comments")
    ).toBeInTheDocument();
    expect(screen.getByText("No posts found")).toBeInTheDocument();
  });

  it("should display PostList with comment list", async function () {
    usePostsMock.mockReturnValueOnce(
      usePostsMockReturnData({ posts: testPosts })
    );

    useCommentListMock.mockReturnValueOnce(useCommentListMockReturnData());
    act(() => {
      render(<PostList propsMessage="Hello component" testId={testId} />);
    });

    expect(screen.getByTestId(`${testId}-post-card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-comment-list`)).toBeInTheDocument();
    expect(screen.getByText("test message")).toBeInTheDocument();
  });
});
