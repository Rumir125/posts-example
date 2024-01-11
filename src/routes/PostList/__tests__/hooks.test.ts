import { renderHook } from "@testing-library/react";
import expect from "expect";
import { testPosts, testUser } from "../../../__mocks__/mockData";
import { useFetchData } from "../../../shared/fetchHelper";
import usePosts from "../hooks/usePosts";

jest.mock("../../../shared/fetchHelper");

describe("usePosts", () => {
  it("should check if updated posts and user data is returned", () => {
    (useFetchData as jest.Mock).mockImplementation((url: string) =>
      url.includes("/users")
        ? {
            data: [testUser],
            loading: false,
            error: null,
          }
        : {
            data: testPosts,
            loading: false,
            error: null,
          }
    );
    const { result } = renderHook(() => usePosts());

    expect(result.current.posts).toEqual([
      { ...testPosts[0], userName: testUser.name },
    ]);
    expect(result.current.users).toEqual([testUser]);
    expect(result.current.loading).toEqual(false);
    expect(result.current.loadMoreDisabled).toEqual(false);
    expect(result.current.searchText).toEqual("");
    expect(useFetchData).toHaveBeenCalledWith("/users");
    expect(useFetchData).toHaveBeenCalledWith("/posts?_limit=50&_start=0");

    expect(true).toEqual(true);
  });
});
