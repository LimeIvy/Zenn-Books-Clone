import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { swaggerUI } from '@hono/swagger-ui'
import { openApiDoc } from './openapi'
import books from './books'
import chapters from './chapters'

const app = new Hono()

app.use('*', cors({
  origin: '*'
}))

app.get('/doc', (c) => c.json(openApiDoc))
app.get('/ui', swaggerUI({ url: '/doc' }))

app.route('/books', books)
app.route('/chapters', chapters)

export type AppType = typeof app

export default {
  port: 8080,
  fetch: app.fetch,
}