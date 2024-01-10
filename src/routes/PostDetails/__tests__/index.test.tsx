import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useCommentList from "../../../components/CommentList/hooks/useCommentList";
import PostDetails from "..";
import usePostDetails from "../hooks/usePostDetails";
import { testComments, testPost, testUser } from "../../../__mocks__/mockData";

jest.mock(".../../../components/CommentList/hooks/useCommentList");
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
      post: testPost,
      user: testUser,
      loading: false,
    });

    (useCommentList as jest.Mock).mockReturnValueOnce({
      comments: testComments,
      loadingComments: false,
      error: null,
    });
    act(() => {
      render(<PostDetails propsMessage="Hello component" testId={testId} />);
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("example body text")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-comment-list`)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith("Hello component PostDetails");
  });
});
