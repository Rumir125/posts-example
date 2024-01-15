import { usePostCard } from "../hooks/usePostCard";
import { testPostId } from "../../../__mocks__/mockData";
import { useNavigate } from "react-router-dom";
import { act, renderHook } from "@testing-library/react";
import expect from "expect";

jest.mock("react-router-dom");

describe("usePostCard", () => {
  const navigate = jest.fn();

  beforeAll(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });
  it("should check if navigate is called", async () => {
    const { result } = renderHook(() => usePostCard(testPostId, () => {}));

    act(() => {
      result.current.handleClickDetails();
    });
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/post/${testPostId}`);
  });

  it("should check setCurrentId is called", async () => {
    const setCurrentPostIdMock = jest.fn();
    const { result } = renderHook(() =>
      usePostCard(testPostId, setCurrentPostIdMock)
    );
    const stopPropagationMock = jest.fn();

    act(() => {
      result.current.handleClickViewComments({
        stopPropagation: () => stopPropagationMock(),
      }  as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    });

    expect(stopPropagationMock).toHaveBeenCalled();
    expect(setCurrentPostIdMock).toHaveBeenCalledWith(testPostId);
  });
});
