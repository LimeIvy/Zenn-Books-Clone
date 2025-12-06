## Open APIとは

APIのエンドポイント、パラメータ、レスポンスなどを正確に文書化し、共有するためのフォーマット。

このリポジトリではyaml形式で記述する。

### Swaggerとは

OpenAPI仕様を視覚化し、対話式のAPIドキュメントを提供するためのツールのこと。

このリポジトリでは、HonoにSwagger UIを統合している。

## OpenAPIの書き方

`openapi`、`info`、`paths`は必須項目

```yml
openapi: "3.0.3"

info:
...

servers:
...

tags:
...

paths:
...

security:
...

components:
...
 
```
| オブジェクト | 概要 |
| --- | --- |
|openapi| 使用しているOpenAPIのバージョンを指定
|info| APIの基本情報（タイトル、バージョン、説明等）を定義
|servers| サーバーのURLを指定
|tags| 	APIを分類するタグを定義
|paths| APIのエンドポイントと操作（GET, POST等）を定義

### infoオブジェクト

APIの基本情報（タイトル、バージョン、説明等）を定義する

```yml
info:
  title: "Sample API" # 必須。APIのタイトル
  version: "1.0.0" # 必須。APIのドキュメントのバージョン情報
  description: "このAPIはサンプルの操作とデータを提供します。" # APIの短い説明
```

### serversオブジェクト

オブジェクトはAPIがホストされているサーバーのURLを指定し、APIの実行可能な環境を示す

```yml
servers:
  - url: "https://api.example.com/v1" # APIをホストしているサーバーのURL
    description: "本番環境サーバー" # このサーバーに関する追加情報
  - url: "http://localhost:5000" # ローカル開発用のサーバーURL
    description: "開発環境サーバー" # この開発サーバーに関する追加情報
```

### pathsオブジェクト

APIのエンドポイントとそれらに対する具体的な操作（HTTPメソッド）を定義する

#### パラメータがあるとき
```yml
paths:
  /items/{itemId}: # エンドポイント
    get: # HTTPメソッド
      summary: "アイテム一覧の取得" # 操作の簡単な説明
      description: "利用可能なアイテムの一覧を返します。" # 操作の詳細な説明
      tags: ["items"] # タグの付与。
      parameters: # APIリクエストのパラメータを定義
        - name: itemId # パラメータのプロパティ名
          in: path # パラメータの位置: パスパラメータ
          required: true # 必須パラメータかどうか
          description: "取得するアイテムのID。" # パラメータの説明
          schema: { type: string, example: "1021" } # パラメータの型と例。
      requestBody: # リクエストボディを定義
        ...
      responses: # レスポンスを定義
        ...
      
```

#### リクエストボディがあるとき

```yml
paths:
  /items:
    post:
      summary: "新しいアイテムを作成"
      description: "新しいアイテムを追加します。"
      tags: ["items"] 
      requestBody: # リクエストボディを定義
        required: true # このリクエストでボディが必須
        content:
          application/json: # リクエストボディのメディアタイプ
            schema: # リクエストボディの型を定義
              type: object # リクエストボディの型オブジェクト
              properties: # オブジェクトのプロパティを定義
                name: # プロパティ名を記述
                  type: string # アイテム名の型: 文字列
                  description: "アイテムの名前。" # プロパティの説明
                description: # プロパティ名を記述
                  type: string # アイテム説明の型: 文字列
                  description: "アイテムの詳細説明。" # プロパティの説明
            example: # リクエストボディの例
              name: "アイテム1"
              description: "アイテム1の説明が入ります"
      responses:
        ...

  /items/{itemId}:
    get:
      ...

```

#### レスポンスがあるとき

```yml
paths:
  /items: 
    get:
      summary: "アイテム一覧の取得"
      description: "利用可能なアイテムの一覧を返します。"
      tags: ["items"] 
      deprecated: false
      responses: # レスポンスを定義
        "200": # HTTPステータスコード
          description: "成功。アイテム一覧を返します。" # 応答の説明
          content: # レスポンスデータを定義
            application/json: # レスポンスのコンテントタイプ
              schema: # レスポンスのスキーマを定義する
                type: array # レスポンスの型
                example: # スキーマの例を定義
                  - id: "1"
                    name: "アイテム1"
                  - id: "2"
                    name: "アイテム2"
                items: # 配列内のアイテムを定義
                  type: object # アイテムの型
                  properties: # オブジェクトのプロパティを定義
                    id: { type: string, description: "アイテムのID。" } # 型と説明
                    name: { type: string, description: "アイテムの名前。" } # 型と説明
        "400": # HTTPステータスコード
          description: "不正なリクエスト。パラメータが無効です。" # 応答の説明
```
### tagsオブジェクト

各操作を論理的なグループに分類して、ドキュメント内でのナビゲーションを容易にする

```yml
tags:
  - name: "items"
    description: "アイテムに関連する操作。アイテム取得、作成、更新、削除などでが含まれます。"
  - name: "users"
    description: "ユーザー管理に関連する操作。ユーザーの作成、プロファイルの取得、更新などが含まれます。"

```

## 参考文献

[OpenAPI・Swaggerでインタラクティブな API 仕様ドキュメントを作成する](https://zenn.dev/knm/articles/32106f623bd382)