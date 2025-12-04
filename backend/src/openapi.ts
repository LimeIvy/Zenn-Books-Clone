export const openApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for your service',
  },
  paths: {
    '/books': {
      get: {
        summary: 'books',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/chapters': {
      get: {
        summary: 'chapter',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
  },
}