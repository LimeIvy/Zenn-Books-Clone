import { Hono } from 'hono'

export const chapters = new Hono()
  .get('/', (c) => c.json('list chapters'))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))
