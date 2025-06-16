import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/(logged-out)/login/page";
import LandingPage from "@/app/(logged-out)/page";
import SignupPage from "@/app/(logged-out)/sign-up/page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("랜딩페이지 통합 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    render(<LandingPage />);
    user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
  });

  it("랜딩 페이지가 올바르게 렌더링된다", () => {
    expect(screen.getByText("MyCompany")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "회원가입" })).toBeInTheDocument();
  });

  it("로그인 버튼 클릭 시 로그인 페이지로 이동한다", async () => {
    const loginButton = screen.getByRole("link", { name: "로그인" });

    await user.click(loginButton);

    expect(loginButton).toHaveAttribute("href", "/login");
  });

  it("회원가입 버튼 클릭 시 회원가입 페이지로 이동한다", async () => {
    const signupButton = screen.getByRole("link", { name: "회원가입" });

    await user.click(signupButton);

    expect(signupButton).toHaveAttribute("href", "/sign-up");
  });
});

describe("로그인페이지 통합 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    render(<LoginPage />);
    user = userEvent.setup();
  });

  afterEach(() => {
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

describe("회원가입 페이지 통합 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    render(<SignupPage />);
    user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
  });

  it('페이지에 올바른 입력폼이 렌더링된다', () => {
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByText("계정 유형")).toBeInTheDocument();
    expect(screen.getByText("계정 유형을 선택해주세요")).toBeInTheDocument();
    expect(screen.getByLabelText(/생년월일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호 확인/i)).toBeInTheDocument();
  });
});
