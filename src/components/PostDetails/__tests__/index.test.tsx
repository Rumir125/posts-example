import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useCommentList from "../../CommentList/hooks/useCommentList";
import LoggedPostDetails from "..";
import usePostDetails from "../hooks/usePostDetails";

jest.mock("../../CommentList/hooks/useCommentList");
jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => jest.fn(),
    useParams: () => ({
      id: 1,
    }),
  };
});
jest.mock("../hooks/usePostDetails");

const testId = "post-details";
describe("PostDetails", function () {
  beforeEach(() => {
    console.log = jest.fn();
    jest.clearAllMocks();
  });

  beforeAll(() => jest.resetAllMocks());

  it("should display Posts details with comment list", async function () {
    (usePostDetails as jest.Mock).mockReturnValueOnce({
      post: {
        id: 1,
        userId: 1,
        title: "title",
        body: "example body text",
        userName: "John Doe",
      },
      user: {
        id: 1,
        name: "John Doe",
        userName: "john123",
        email: "test@mail.com",
      },
      loading: false,
    });

    (useCommentList as jest.Mock).mockReturnValueOnce({
      comments: [
        { id: 1, title: "title", body: "body", userName: "user", userId: 1 },
      ],
      loadingComments: false,
      error: null,
    });
    act(() => {
      render(
        <LoggedPostDetails propsMessage="Hello component" testId={testId} />
      );
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("example body text")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-comment-list`)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith("Hello component PostDetails");
  });
});
