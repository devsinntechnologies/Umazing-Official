import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-full bg-muted", className)} {...props} />);
}

export { Skeleton }
