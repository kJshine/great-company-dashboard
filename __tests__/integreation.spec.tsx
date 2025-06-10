import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/(logged-out)/login/page";

describe("LoginPage 통합 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    // 각 테스트 전에 컴포넌트 렌더링
    render(<LoginPage />);
    // userEvent 설정
    user = userEvent.setup();
  });

  afterEach(() => {
    // 각 테스트 후 정리 (Vitest는 자동이지만 명시적으로 하고 싶다면)
    cleanup();
  });

  it("로그인 페이지가 올바르게 렌더링된다", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByText("계정이 없으신가요?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "회원가입" })).toBeInTheDocument();
  });

  it("사용자가 폼에 입력할 수 있다", async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("잘못된 이메일 형식으로 제출 시 에러가 표시된다", async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: "로그인" });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });

  it("유효한 데이터로 폼 제출이 작동한다", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: "로그인" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    consoleSpy.mockRestore();
  });
});
