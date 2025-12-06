import * as z from 'zod'

export const querySchema = z.object({
  book_id: z.string(),
  chapter_number: z.coerce.number().int().min(1)
})

export const booksSchema = z.object({
  title: z.string().max(70),
  auther: z.string().max(40),
  description: z.string().max(1000)
})

export const chaptersSchema = z.object({
  chapter_number: z.coerce.number().min(1),
  name: z.string().max(150),
  content: z.string()
})