import { renderHook } from "@testing-library/react";
import expect from "expect";
import { testPost, testPostId, testUser } from "../../../__mocks__/mockData";
import { useFetchData } from "../../../shared/fetchHelper";
import usePostDetails from "../hooks/usePostDetails";

jest.mock("../../../shared/fetchHelper");

describe("usePostDetails", () => {
  it("should check if post and user data is returned", () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: testPost,
      loading: false,
      error: null,
    });

    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: testUser,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => usePostDetails(testPostId));
    expect(result.current.post).toEqual(testPost);
    expect(result.current.user).toEqual(testUser);
  });

  it("should return posts and user loading", () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: undefined,
      loading: true,
      error: null,
    });

    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: undefined,
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => usePostDetails(testPostId));
    expect(result.current.post).toEqual(undefined);
    expect(result.current.user).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
  });
});
