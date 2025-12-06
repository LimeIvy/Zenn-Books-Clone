import * as z from 'zod'

export const booksSchema = z.object({
  title: z.string().max(70),
  auther: z.string().max(40),
  description: z.string().max(1000)
})