"use client"
import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}

export default SmoothScrolling
