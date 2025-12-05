import { request } from "http";

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
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      post: {
        summary: "本の新規追加",
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
    "/books/{id}": {
      get: {
        summary: "本の詳細情報の取得・全チャプター取得",
        parameters: [
          {
            name: "id",
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
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
      delete: {
        summary: "本の削除",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    "/chapters": {
      get: {
        summary: "chapter",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
  },
};
