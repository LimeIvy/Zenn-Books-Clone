import { Hono } from "hono";
import { connection } from "./db";
import { uuidv7 } from "uuidv7";
import { zValidator } from '@hono/zod-validator'

import { booksSchema } from "./schema"

export const books = new Hono()
  /* 本一覧の取得 */
  .get("/", async (c) => {
    try {
      const books = await connection.query(
        "SELECT BIN_TO_UUID(CAST(id AS BINARY(16))) AS id, title, auther, description FROM books;"
      );
      return c.json(books[0]);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* 本の新規追加 */
  .post("/", zValidator('json', booksSchema), async (c) => {
    const body = await c.req.valid('json');
    const title = body.title;
    const auther = body.auther;
    const description = body.description;
    console.log(title, auther, description);
    try {
      const id = uuidv7();
      await connection.query(
        `INSERT INTO books (id, title, auther, description) VALUES (UUID_TO_BIN(?), ?, ?, ?);`,
        [id, title, auther, description]
      );
      return c.json({ id: id, message: "Success" });
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* 本の詳細情報の取得 */
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    console.log(id);

    try {
      const book = await connection.query(
        `SELECT BIN_TO_UUID(CAST(id AS BINARY(16))) AS id, title, auther, description, created_at FROM books WHERE id = UUID_TO_BIN(?);`,
        [id]
      );

      const rows = book[0];
      return c.json(Array.isArray(rows) ? rows[0] : rows);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })

  /* 本の詳細情報の更新 */
  .put("/:id", zValidator('json', booksSchema), async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const title = body.title;
    const auther = body.auther;
    const description = body.description;

    try {
      await connection.query(
        `UPDATE books SET title = ?, auther = ?, description = ? WHERE id = UUID_TO_BIN(?);`,
        [title, auther, description, id]
      );

      return c.json({ message : "Success" });
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* 本の削除 */
  .delete("/:id", async (c) => {
    try {
      await connection.query("DELETE FROM books WHERE id = UUID_TO_BIN(?);", [
        c.req.param("id"),
      ]);
      return c.json({ message: "Success" });
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  });
