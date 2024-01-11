import { renderHook } from "@testing-library/react";
import useCommentList from "../hooks/useCommentList";
import { testComments, testPostId } from "../../../__mocks__/mockData";
import { useFetchData } from "../../../shared/fetchHelper";

jest.mock("../../../shared/fetchHelper");

describe("useCommentList", () => {
  it("should return an empty comment list", () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: [],
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useCommentList(testPostId));

    expect(result.current.comments).toEqual([]);
    expect(result.current.loadingComments).toBe(false);
  });

  it("should return a comment list with one comment", () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: testComments,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useCommentList(testPostId));

    expect(result.current.comments).toEqual(testComments);
    expect(result.current.loadingComments).toBe(false);
  });

  it("should return loading state while fetching comments", () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: [],
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => useCommentList(testPostId));

    expect(result.current.comments).toEqual([]);
    expect(result.current.loadingComments).toBe(true);
  });

  it("should return an error when fetching comments fails", () => {
    const mockError = new Error("Failed to fetch comments");
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: [],
      loading: false,
      error: mockError,
    });

    const { result } = renderHook(() => useCommentList(testPostId));

    expect(result.current.comments).toEqual([]);
    expect(result.current.loadingComments).toBe(false);
    expect(result.current.error).toBe(mockError);
  });
});
