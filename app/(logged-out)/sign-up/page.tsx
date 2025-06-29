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
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignup } from "@/hooks/useSignup";
import { FormInput } from "@/components/form/form-input";

export default function SignupPage() {
  const { form, onSubmit, accountType, dobFromDate } = useSignup();

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
              <FormInput
                form={form}
                name="email"
                label="이메일"
                placeholder="이메일을 입력해주세요"
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
                  <FormInput
                    form={form}
                    name="companyName"
                    label="회사"
                    placeholder="회사명을 입력해주세요"
                  />
                  <FormInput
                    form={form}
                    type="number"
                    name="numberOfEmployee"
                    label="직원 수"
                    min={0}
                    placeholder="직원 수를 입력해주세요"
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
              <FormInput
                form={form}
                name="password"
                label="비밀번호"
                type="password"
                placeholder="특수 문자를 포함한 8자리 이상의 비밀번호를 입력해주세요"
              />
              <FormInput
                form={form}
                name="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
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
