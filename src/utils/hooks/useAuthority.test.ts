import { renderHook } from "@testing-library/react";
import useAuthority from "./useAuthority";

describe("useAuthority Hook", () => {
  it("should return true when user has matching authority", () => {
    const userAuthority = ["ADMIN", "USER"];
    const requiredAuthority = ["ADMIN"];

    const { result } = renderHook(() =>
      useAuthority(userAuthority, requiredAuthority)
    );

    expect(result.current).toBe(true);
  });

  it("should return false when user does not have matching authority", () => {
    const userAuthority = ["USER"];
    const requiredAuthority = ["ADMIN"];

    const { result } = renderHook(() =>
      useAuthority(userAuthority, requiredAuthority)
    );

    expect(result.current).toBe(false);
  });

  it("should return emptyCheck value when authority array is empty", () => {
    const userAuthority = ["ADMIN"];
    const requiredAuthority: string[] = [];

    const { result } = renderHook(() =>
      useAuthority(userAuthority, requiredAuthority, true)
    );

    expect(result.current).toBe(true);
  });

  it("should return emptyCheck value when userAuthority array is empty", () => {
    const userAuthority: string[] = [];
    const requiredAuthority = ["ADMIN"];

    const { result } = renderHook(() =>
      useAuthority(userAuthority, requiredAuthority, false)
    );

    expect(result.current).toBe(false);
  });

  it("should return emptyCheck value when authority is undefined", () => {
    const userAuthority = ["ADMIN"];
    const requiredAuthority = undefined as unknown as string[];

    const { result } = renderHook(() =>
      useAuthority(userAuthority, requiredAuthority, true)
    );

    expect(result.current).toBe(true);
  });
});
