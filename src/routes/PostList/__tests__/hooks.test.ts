import { act, renderHook, waitFor } from "@testing-library/react";
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
    expect(useFetchData).toHaveBeenCalledWith("/users");
    expect(useFetchData).toHaveBeenCalledWith("/posts?_limit=50&_start=0");
  });

  it("should call handle search", async () => {
    const newTestUser = { ...testUser, id: 2, name: "Jim" };
    (useFetchData as jest.Mock).mockImplementation((url: string) =>
      url.includes("/users")
        ? {
            data: [testUser, newTestUser],
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
    await act(async () => {
      result.current.handleSearch(newTestUser.name);
    });

    await waitFor(() => {
      expect(useFetchData).toHaveBeenCalledWith(
        `/posts?_limit=50&_start=0&userId=${newTestUser.id}`
      );
      expect(result.current.users).toEqual([testUser, newTestUser]);
    });

    expect(true).toEqual(true);
  });
});
