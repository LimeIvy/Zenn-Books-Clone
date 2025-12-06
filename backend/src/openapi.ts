export const openApiDoc = {
  openapi: "3.0.0",
  info: {
    title: "Zenn Books Clone API Documentation",
    version: "1.0.0",
    description: "Zennの書籍機能のクローンアプリです。",
  },
  paths: {
    "/books": {
      get: {
        summary: "本一覧の取得",
        tags: ["Books"],
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      post: {
        summary: "本の新規追加",
        tags: ["Books"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  auther: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    "/books/{book_id}": {
      get: {
        summary: "本の詳細情報の取得・全チャプター取得",
        tags: ["Books"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      put: {
        summary: "本の詳細情報の更新",
        tags: ["Books"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  auther: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      delete: {
        summary: "本の削除",
        tags: ["Books"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    "/books/{book_id}/chapters": {
      post: {
        summary: "チャプターの新規作成",
        tags: ["Chapters"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  chapter_number: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    "/books/{book_id}/chapters/{chapter_number}": {
      get: {
        summary: "チャプター内容の取得",
        tags: ["Chapters"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "chapter_number",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      put: {
        summary: "チャプター内容の更新",
        tags: ["Chapters"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "chapter_number",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  chapter_number: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      delete: {
        summary: "チャプターの削除",
        tags: ["Chapters"],
        parameters: [
          {
            name: "book_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "chapter_number",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Books",
      description:
        "本の新規作成、一覧取得、詳細情報の取得、更新、削除などを行う。",
    },
    {
      name: "Chapters",
      description: "本の全チャプターの取得、追加、更新、削除などを行う。",
    },
  ],
};
