// src/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { HISVG } from '@/components/ui/hi-svg'
const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <div className="flex min-h-svh flex-col space-y-4 items-center justify-center">
      <div>
      <HISVG/>
      </div>
      <h3>Hi there, Project contains production level tanstackStart, tailwind/vite, ShadCN</h3>
      {/* <img src="../components/vectors/Hi-icon.svg" alt="" /> */}
    </div>
  )
}