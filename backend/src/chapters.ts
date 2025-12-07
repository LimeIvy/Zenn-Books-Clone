import { Hono } from "hono";
import { connection } from "./db";
import { zValidator } from "@hono/zod-validator";

import { querySchema } from "./schema";
import { chaptersSchema } from "./schema";

export const chapters = new Hono()
  /* チャプター一覧の取得 */
  .get("/", async (c) => {
    const book_id = c.req.param("book_id");

    try {
      const chapters = await connection.query(
        `SELECT BIN_TO_UUID(CAST(id AS BINARY(16))) AS id, chapter_number, name, content FROM chapters WHERE book_id = UUID_TO_BIN(?);`,
        [book_id]
      );

      return c.json(chapters[0]);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* チャプターの新規作成 */
  .post("/", zValidator("json", chaptersSchema), async (c) => {
    const book_id = c.req.param("book_id");
    const body = await c.req.valid("json");
    const chapter_number = body.chapter_number;
    const name = body.name;
    const content = body.content;
    try {
      await connection.query(
        `INSERT INTO chapters (book_id, chapter_number, name, content) VALUES ( UUID_TO_BIN(?), ?, ?, ?);`,
        [book_id, chapter_number, name, content]
      );
      return c.json({ message: "Success" });
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* チャプター内容の取得 */
  .get("/:chapter_number", zValidator("param", querySchema), async (c) => {
    const book_id = c.req.param("book_id");
    const chapter_number = c.req.param("chapter_number");
    console.log("book_id", book_id);
    console.log("chapter_number", chapter_number);
    try {
      const chapters = await connection.query(
        `SELECT name, content FROM chapters WHERE book_id = UUID_TO_BIN(?) AND chapter_number = ?;`,
        [book_id, chapter_number]
      );

      const rows = chapters[0];
      return c.json(Array.isArray(rows) ? rows[0] : rows);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* チャプター内容の更新 */
  .put("/:chapter_number", zValidator("json", chaptersSchema), async (c) => {
    const book_id = c.req.param("book_id");
    const chapter_number = c.req.param("chapter_number");
    const body = await c.req.valid("json");
    const new_chapter_number = body.chapter_number;
    const name = body.name;
    const content = body.content;

    try {
      await connection.query(
        `UPDATE chapters SET chapter_number = ?, name = ?, content = ? WHERE book_id = UUID_TO_BIN(?) AND chapter_number = ?;`,
        [new_chapter_number, name, content, book_id, chapter_number]
      );

      return c.json({ message: "Success" });
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  /* チャプターの削除 */
  .delete("/:chapter_number", zValidator("param", querySchema), async (c) => {
    const book_id = c.req.param("book_id");
    const chapter_number = c.req.param("chapter_number");
    try {
      await connection.query(
        "DELETE FROM chapters WHERE book_id = UUID_TO_BIN(?) AND chapter_number = ? ;",
        [book_id, chapter_number]
      );
      return c.json({ message: "Success" });
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  });
