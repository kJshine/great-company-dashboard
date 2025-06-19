"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/hooks";
import Link from "next/link";

export default function LoginPage() {
  const { form, onSubmit } = useLogin();

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormInput form={form} name="email" label="이메일" />
              <FormInput
                form={form}
                name="password"
                label="비밀번호"
                type="password"
              />
              <Button type="submit">로그인</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <small>계정이 없으신가요?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="sign-up">회원가입</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
