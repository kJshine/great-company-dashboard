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
import { AUTH_CONSTANTS, AUTH_MESSAGE, AUTH_REGEX } from "@/lib/constants";
import { authFormSchema } from "@/lib/schema";

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      companyName: "",
      numberOfEmployee: 0,
      password: "",
      passwordConfirm: "",
      acceptTerm: false,
    },
  });

  const onSubmit = (data: z.infer<typeof authFormSchema>) => {
    console.log(data);
    router.push("/dashboard");
  };

  const accountType = form.watch("accountType");

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - AUTH_CONSTANTS.MAX_AGE);

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
                      <Input placeholder="이메일을 입력해주세요" {...field} />
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
