import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/past')({
  component: () => <div>Hello /past!</div>,
})
