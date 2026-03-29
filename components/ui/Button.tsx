import { cn } from "@/lib/utils"

export default function Button({ children, className, ...props }: any) {
  return (
    <button
      className={cn("px-4 py-2 rounded-xl bg-white/10 backdrop-blur hover:opacity-80", className)}
      {...props}
    >
      {children}
    </button>
  )
}
