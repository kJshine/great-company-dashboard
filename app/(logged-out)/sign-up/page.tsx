"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.string().email(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    numberOfEmployee: z.coerce.number().optional(),
    dob: z.date().refine((date) => {
      const today = new Date();
      const eightedYearAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eightedYearAgo;
    }, "18세 미만은 가입하실 수 없습니다"),
    password: z
      .string()
      .min(8, "비밀번호는 8자리 이상 입력해주세요")
      .refine((password) => {
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return specialCharRegex.test(password);
      }, "비밀번호에 특수문자를 포함해주세요"),
    passwordConfirm: z.string(),
    acceptTerm: z
      .boolean({
        required_error: "이용약관에 동의해주세요",
      })
      .refine((checked) => checked, "이용약관에 동의해주세요"),
  })
  .superRefine((data, ctx) => {
    if (data.accountType === "company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "회사 이름을 입력해주세요",
      });
    }

    if (
      data.accountType === "company" &&
      (!data.numberOfEmployee || data.numberOfEmployee < 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numberOfEmployee"],
        message: "직원 수를 입력해주세요",
      });
    }

    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다",
      });
    }
  });

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      companyName: "",
      numberOfEmployee: 0,
      password: "",
      passwordConfirm: "",
      acceptTerm: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    router.push("/dashboard");
  };

  const accountType = form.watch("accountType");

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력해주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>계정 유형</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="계정 유형을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">개인</SelectItem>
                          <SelectItem value="company">기업</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>회사</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="회사명을 입력해주세요."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>직원 수</FormLabel>
                        <FormControl>
                          <Input
                            min={0}
                            type="number"
                            placeholder="직원 수를 입력해주세요"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>생년월일</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="flex justify-between"
                          >
                            {!!field.value
                              ? format(field.value, "P")
                              : "날짜 선택"}
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          hidden={{ after: new Date(), before: dobFromDate }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="특수 문자를 포함한 8자리 이상의 비밀번호를 입력해주세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="비밀번호를 다시 입력해주세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptTerm"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-start gap-2 pt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>(필수)개인정보약관 동의</FormLabel>
                    </div>
                    <FormDescription>
                      회원가입을 위해{" "}
                      <Link href="/terms" className="text-primary">
                        개인정보처리방침
                      </Link>
                      에 동의합니다
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">회원가입</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <small>계정이 이미 있으신가요?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="login">로그인</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
