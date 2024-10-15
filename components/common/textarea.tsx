import * as React from "react";

import { cn } from "@/utils/style";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border dark:text-white border-gray-300 px-3 py-2 bg-transparent box-border outline-none text-lg transition-all duration-300 ease-in-out",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
