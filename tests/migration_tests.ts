import { assertEquals } from "@std/assert/equals";
import { DatabaseSync } from "node:sqlite";
import { createBlacklistDb } from "../db/migration.ts";
import { assertNotEquals } from "@std/assert/not-equals";
const testDbFile = "db/test_blacklist.db";
Deno.test(function testCreateBlacklistDb() {
  createBlacklistDb(testDbFile);

  // Get table
  const db = new DatabaseSync(testDbFile);
  const table = db.prepare(
    `SELECT name FROM sqlite_master WHERE type ='table' AND name = 'blacklist_db';`,
  ).get();
  db.close();

  assertNotEquals(table, undefined);
  assertEquals(table?.name, "blacklist_db");
  Deno.removeSync(testDbFile);
});
