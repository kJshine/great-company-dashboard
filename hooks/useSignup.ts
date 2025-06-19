import { AUTH_CONSTANTS } from "@/lib/constants";
import { signupFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const useSignup = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      companyName: "",
      numberOfEmployee: 0,
      password: "",
      passwordConfirm: "",
      acceptTerm: false,
    },
  });

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    console.log(data);
    router.push("/dashboard");
  };

  const accountType = form.watch("accountType");

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - AUTH_CONSTANTS.MAX_AGE);

  return {
    form,
    onSubmit,
    accountType,
    dobFromDate,
  };
};
