import PostCard from "..";
import { PostData } from "../../../shared/type";

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

const testPostData: PostData = {
  id: 1,
  title: "title",
  body: "body",
  userName: "test user name",
  userId: 1,
};

describe("App", function () {
  beforeEach(() => {
    console.log = jest.fn();
  });
  it("should display Post Card with specified data", async function () {
    act(() => {
      render(
        <PostCard
          propsMessage="Hello component"
          postData={testPostData}
          setCurrentPostId={() => {}}
          testId={testId}
        />
      );
    });
    expect(screen.queryByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText(testPostData.title)).toBeInTheDocument();
    expect(screen.getByText(testPostData.userName)).toBeInTheDocument();

    expect(console.log).toHaveBeenCalledWith("Hello component PostCard");
  });
});
