import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function Container({ children }: Props) {
  return <div className="container">{children}</div>
}
