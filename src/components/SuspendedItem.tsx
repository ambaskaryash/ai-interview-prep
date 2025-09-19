import { ReactNode, Suspense } from "react"

export async function SuspendedItem<T>({
  item,
  fallback,
  result,
}: {
  item: Promise<T>
  fallback: ReactNode
  result: (item: T) => ReactNode
}) {
  const resolvedItem = await item;
  return (
    <Suspense fallback={fallback}>
      {result(resolvedItem)}
    </Suspense>
  )
}
