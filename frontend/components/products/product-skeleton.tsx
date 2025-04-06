import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
  return (
    <div className="rounded-lg border bg-background">
      <Skeleton className="aspect-square w-full rounded-t-lg" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  )
}

