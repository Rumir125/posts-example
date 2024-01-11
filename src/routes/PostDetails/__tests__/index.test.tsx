import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PostDetails from "..";
import {
  testPost,
  testUser,
  useCommentListMockReturnData,
} from "../../../__mocks__/mockData";
import useCommentList from "../../../components/CommentList/hooks/useCommentList";
import usePostDetails from "../hooks/usePostDetails";

// TODO: Cover more test conditions

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
const usePostDetailsMock = usePostDetails as jest.Mock;
const useCommentListMock = useCommentList as jest.Mock;

const testId = "post-details";
describe("PostDetails", function () {
  beforeEach(() => {
    console.log = jest.fn();
    jest.clearAllMocks();
  });

  beforeAll(() => jest.resetAllMocks());

  it("should display Posts details with comment list", async function () {
    usePostDetailsMock.mockReturnValueOnce({
      post: testPost,
      user: testUser,
      loading: false,
    });

    useCommentListMock.mockReturnValueOnce(useCommentListMockReturnData());
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
