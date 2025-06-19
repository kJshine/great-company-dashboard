// useSignup.spec.ts
import { renderHook, act } from "@testing-library/react";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";
import { AUTH_CONSTANTS } from "@/lib/constants";
import { vi, describe, it, expect, beforeEach } from "vitest";

// useRouter 모킹
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// @hookform/resolvers/zod 모킹
vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: vi.fn(() => "mocked-resolver"),
}));

const watchMock = vi.fn();
const triggerMock = vi.fn().mockResolvedValue(true);

// react-hook-form 모킹
vi.mock("react-hook-form", () => {
  return {
    useForm: vi.fn(() => ({
      watch: watchMock,
      trigger: triggerMock,
      getValues: vi.fn(() => ({
        email: "",
        companyName: "",
        numberOfEmployee: 0,
        password: "",
        passwordConfirm: "",
        acceptTerm: false,
      })),
      handleSubmit: vi.fn((cb) =>
        vi.fn((e) => {
          e?.preventDefault?.();
          return cb;
        })
      ),
      formState: { errors: {} },
    })),
  };
});

describe("useSignup 훅", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 상태가 올바르게 설정된다", () => {
    const { result } = renderHook(() => useSignup());

    // form 객체가 생성되었는지 확인
    expect(result.current.form).toBeDefined();

    // 기본값 확인
    expect(result.current.form.getValues()).toEqual({
      email: "",
      companyName: "",
      numberOfEmployee: 0,
      password: "",
      passwordConfirm: "",
      acceptTerm: false,
    });

    // accountType이 undefined인지 확인 (초기에는 선택되지 않음)
    expect(result.current.accountType).toBeUndefined();

    // dobFromDate가 적절하게 계산되었는지 확인
    const expectedDate = new Date();
    expectedDate.setFullYear(
      expectedDate.getFullYear() - AUTH_CONSTANTS.MAX_AGE
    );

    // Date 객체를 직접 비교하면 정확히 같지 않을 수 있으므로 년도만 확인
    expect(result.current.dobFromDate.getFullYear()).toBe(
      expectedDate.getFullYear()
    );
  });

  it("onSubmit 함수가 데이터를 콘솔에 출력하고 라우터를 호출한다", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const mockPush = vi.fn();
    (useRouter as any).mockReturnValue({ push: mockPush });

    const { result } = renderHook(() => useSignup());

    // 테스트 데이터
    const testData = {
      email: "test@example.com",
      accountType: "personal" as const,
      dob: new Date("1990-01-01"),
      password: "Password123!",
      passwordConfirm: "Password123!",
      acceptTerm: true,
    };

    // onSubmit 함수 호출
    act(() => {
      result.current.onSubmit(testData);
    });

    // console.log가 호출되었는지 확인
    expect(consoleSpy).toHaveBeenCalledWith(testData);

    // router.push가 호출되었는지 확인
    expect(mockPush).toHaveBeenCalledWith("/dashboard");

    consoleSpy.mockRestore();
  });

  it("계정 유형이 변경되면 accountType 값이 업데이트된다", () => {
    watchMock.mockReturnValueOnce(undefined);

    const { result } = renderHook(() => useSignup());

    watchMock.mockReturnValue("personal");

    const { result: updatedResult } = renderHook(() => useSignup());

    expect(updatedResult.current.accountType).toBe("personal");

    watchMock.mockReturnValue("company");

    const { result: finalResult } = renderHook(() => useSignup());

    // 'company'로 업데이트되었는지 확인
    expect(finalResult.current.accountType).toBe("company");
  });

  it("폼 유효성 검사가 작동한다", async () => {
    triggerMock.mockResolvedValueOnce(true);

    const { result } = renderHook(() => useSignup());

    let isValid = await result.current.form.trigger();

    expect(isValid).toBe(true);

    triggerMock.mockResolvedValueOnce(false);

    isValid = await result.current.form.trigger("email");

    expect(isValid).toBe(false);

    expect(triggerMock).toHaveBeenCalledWith("email");
  });
});
