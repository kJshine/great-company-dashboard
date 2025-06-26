import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/(logged-out)/login/page";
import LandingPage from "@/app/(logged-out)/page";
import SignupPage from "@/app/(logged-out)/sign-up/page";
import { AUTH_MESSAGE } from "@/lib/constants";
import DashboardPage from "@/app/dashboard/page";
import DashboardLayout from "@/app/dashboard/layout";

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
    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByText("계정이 없으신가요?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "회원가입" })).toBeInTheDocument();
  });

  it("사용자가 폼에 입력할 수 있다", async () => {
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("잘못된 이메일 형식으로 제출 시 에러가 표시된다", async () => {
    const emailInput = screen.getByLabelText("이메일");
    const submitButton = screen.getByRole("button", { name: "로그인" });

    await user.type(emailInput, AUTH_MESSAGE.EMAIL_REQUIRED);
    await user.click(submitButton);

    expect(
      await screen.findByText(AUTH_MESSAGE.EMAIL_INVALID)
    ).toBeInTheDocument();
  });

  it("유효한 데이터로 폼 제출이 작동한다", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
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

  it("페이지에 올바른 입력폼이 렌더링된다", () => {
    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    expect(screen.getByText("계정 유형")).toBeInTheDocument();
    expect(screen.getByText("계정 유형을 선택해주세요")).toBeInTheDocument();
    expect(screen.getByLabelText("생년월일")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
  });
});

describe("대시보드 페이지 통합 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    render(<DashboardLayout children={<DashboardPage />} />);
    user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
  });

  it("페이지에 요소들이 올바르게 렌더링된다", () => {
    expect(screen.getByText("김재환님, 환영합니다")).toBeInTheDocument();
    expect(screen.getByText("대시보드")).toBeInTheDocument();
    expect(screen.getByText("팀")).toBeInTheDocument();
    expect(screen.getByText("직원")).toBeInTheDocument();
    expect(screen.getByText("계정")).toBeInTheDocument();
    expect(screen.getByText("설정")).toBeInTheDocument();
  });
});
