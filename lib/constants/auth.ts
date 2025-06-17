export const AUTH_CONSTANTS = {
  MIN_AGE: 18,
  MAX_AGE: 120,
  MIN_PASSWORD_LENGTH: 8,
  ACCOUNT_TYPES: {
    PERSONAL: "personal",
    COMPANY: "company",
  },
} as const;

export const AUTH_MESSAGE = {
  EMAIL_REQUIRED: "이메일을 입력해주세요",
  EMAIL_INVALID: "올바른 이메일 형식을 입력해주세요",
  ACCOUNT_TYPE_REQUIRED: "계정 유형을 선택해주세요",
  AGE_RESTRICTION: `${AUTH_CONSTANTS.MIN_AGE}세 미만은 가입하실 수 없습니다`,
  PASSWORD_REQUIERED: `비밀번호는 ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} 자리 이상 입력해주세요`,
  PASSWORD_SPECIAL_CHARACTER: "비밀번호에 특수문자를 포함해주세요",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다",
  COMPANY_NAME_REQUIRED: "회사 이름을 입력해주세요",
  EMPLOYEE_COUNT_REQUIRED: "직원 수를 입력해주세요",
  TERMS_REQUIRED: "이용약관에 동의해주세요",
} as const;

export const AUTH_REGEX = {
  SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
} as const;
