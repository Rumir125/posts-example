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
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
      })),
    });
  });

  it("should check setCurrentId is called", async () => {
    const setCurrentPostIdMock = jest.fn();
    const { result } = renderHook(() =>
      usePostCard(testPostId, setCurrentPostIdMock, jest.fn())
    );
    const stopPropagationMock = jest.fn();
    const preventDefaultMock = jest.fn();

    act(() => {
      result.current.handleClickViewComments({
        stopPropagation: () => stopPropagationMock(),
        preventDefault: () => preventDefaultMock(),
      } as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    });

    expect(stopPropagationMock).toHaveBeenCalled();
    expect(preventDefaultMock).toHaveBeenCalled();
    expect(setCurrentPostIdMock).toHaveBeenCalledWith(testPostId);
  });
});
