import { Hono } from "hono";
import { connection } from "./db";

export const books = new Hono()
  .get("/", async (c) => {
    try {
      const books = await connection.query("SELECT * FROM books");
      return c.json(books[0]);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Database error" }, 500);
    }
  })
  .post("/", (c) => c.json("create a book", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));
