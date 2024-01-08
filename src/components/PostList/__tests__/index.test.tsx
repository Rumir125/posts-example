import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LoggedPostList from "..";
import useCommentList from "../../CommentList/hooks/useCommentList";
import usePosts from "../hooks/usePosts";

jest.mock("../hooks/usePosts");
jest.mock("../../PostCard/hooks/usePostCard", () => {
  return {
    usePostCard: () => ({
      handleClickDetails: () => {},
      handleClickViewComments: () => {},
    }),
  };
});
jest.mock("../../CommentList/hooks/useCommentList");

const testId = "post-list";
describe("PostList", function () {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  beforeAll(() => jest.resetAllMocks());

  it("should display Posts list with empty comment list", async function () {
    (usePosts as jest.Mock).mockReturnValueOnce({
      posts: [
        { id: 1, title: "title", body: "body", userName: "user", userId: 1 },
      ],
      currentPostId: null,
      setCurrentPostId: jest.fn(),
      searchText: "",
      setSearchText: () => {},
      loading: false,
    });
    (useCommentList as jest.Mock).mockReturnValueOnce({
      comments: [],
      loadingComments: false,
      error: null,
    });
    act(() => {
      render(<LoggedPostList propsMessage="Hello component" testId={testId} />);
    });

    expect(
      screen.getByText("Please select a post to see comments")
    ).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-post-card-1`)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith("Hello component PostList");
  });
  it("should display empty PostList", async function () {
    (usePosts as jest.Mock).mockReturnValueOnce({
      posts: [],
      currentPostId: null,
      setCurrentPostId: jest.fn(),
      searchText: "",
      setSearchText: () => {},
      loading: false,
    });
    (useCommentList as jest.Mock).mockReturnValueOnce({
      comments: [],
      loadingComments: false,
      error: null,
    });
    act(() => {
      render(<LoggedPostList propsMessage="Hello component" testId={testId} />);
    });

    expect(
      screen.getByText("Please select a post to see comments")
    ).toBeInTheDocument();
    expect(screen.getByText("No posts found")).toBeInTheDocument();
  });

  it("should display PostList with comment list", async function () {
    (usePosts as jest.Mock).mockReturnValueOnce({
      posts: [
        { id: 1, title: "title", body: "body", userName: "user", userId: 1 },
      ],
      currentPostId: 1,
      setCurrentPostId: jest.fn(),
      searchText: "",
      setSearchText: () => {},
      loading: false,
    });

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
      render(<LoggedPostList propsMessage="Hello component" testId={testId} />);
    });

    expect(screen.getByTestId(`${testId}-post-card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-comment-list`)).toBeInTheDocument();
    expect(screen.getByText("test message")).toBeInTheDocument();
  });
});
