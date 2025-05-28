import { Button } from "@/components/ui/button";
import { Building2Icon } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <Building2Icon size={50} className="text-orange-500" />
        <span>MyCompany</span>
      </h1>
      <p>고객관리를 위해 항상 최선을 다합니다.</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/login">로그인</Link>
        </Button>
        <small>or</small>
        <Button variant={"outline"}>
          <Link href="/sign-up">회원가입</Link>
        </Button>
      </div>
    </>
  );
}
