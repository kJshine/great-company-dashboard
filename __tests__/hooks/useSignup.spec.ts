// useSignup.spec.ts
import { renderHook, act } from "@testing-library/react";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";
import { AUTH_CONSTANTS } from "@/lib/constants";

describe("useSignup 훅", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 상태가 올바르게 설정된다", () => {

  });

  it("onSubmit 함수가 데이터를 콘솔에 출력하고 라우터를 호출한다", () => {

  });

  it("계정 유형이 변경되면 accountType 값이 업데이트된다", () => {

  });

  it("폼 유효성 검사가 작동한다", async () => {

  });
});
