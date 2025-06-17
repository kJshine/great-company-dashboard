import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { EyeClosedIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

function PasswordInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn("relative")}>
      <Input type={showPassword ? "text" : "password"} {...props} className={cn("pr-10", className)} />
      <span
        className={cn("absolute top-[7px] right-3 cursor-pointer select-none")}
      >
        {showPassword ? (
          <EyeOffIcon onClick={() => setShowPassword(false)} />
        ) : (
          <EyeIcon onClick={() => setShowPassword(true)} />
        )}
      </span>
    </div>
  );
}

export { PasswordInput };
