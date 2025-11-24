import { assertEquals } from "@std/assert";
import { E621Bot } from "./models/E621Bot.ts";
import { E621UrlBuilderPosts } from "./models/E621UrlBuilderPosts.ts";
import { API_PAGE_SIZE } from "./constants/numbers.ts";
import * as urls from "./constants/urls.ts";

Deno.test(function buildUrlTest() {
  const testUrl =
    `https://e621.net/posts.json?tags=dragon+rating:safe&page=1&limit=${API_PAGE_SIZE}`;
  const testUrlBuilder = new E621UrlBuilderPosts();
  testUrlBuilder.tags = ["dragon"];
  testUrlBuilder.rating = "rating:safe";
  assertEquals(testUrlBuilder.buildUrl(), testUrl);
});

Deno.test(function tagStringTest() {
  const testTagString = "?tags=dragon+unicorn+rating:safe";
  const testUrlBuilder = new E621UrlBuilderPosts();
  testUrlBuilder.tags = ["dragon", "unicorn", "rating:safe"];
  assertEquals(testUrlBuilder.tagString(), testTagString);
});

Deno.test(function getFileExtensionsTest() {
  const testFile = "test-file.txt";
  const testUrlBuilder = new E621UrlBuilderPosts();
  assertEquals(testUrlBuilder.getFileExtensions(testFile), "txt");
});

Deno.test(async function parseInlineQueryTest() {
  const testUrlBuilder = new E621UrlBuilderPosts();
  testUrlBuilder.tags = ["dragon", "unicorn"];
  testUrlBuilder.rating = encodeURIComponent(urls.rating.safe);
  const testBot = new E621Bot("TEST_TOKEN", "TEST_TOKEN");
  assertEquals(
    await testBot.parseInlineQuery(
      "dragon unicorn safe",
      new E621UrlBuilderPosts(),
    ),
    testUrlBuilder,
  );
});

Deno.test(async function sendRequestTest() {
  const testUrl = "https://e621.net/posts?tags=dragon+rating:safe";
  const testBot = new E621Bot("TEST_TOKEN", "TEST_TOKEN");
  const testResponse = await testBot.sendRequest(testUrl);
  await testResponse.body?.cancel(); // Cancel test request
  assertEquals(testResponse.status, 401);
});

Deno.test(async function calcMegabytesTest() {
  const testBot = new E621Bot("TEST_TOKEN", "TEST_TOKEN");
  const testValue = 1024; // bytes
  await assertEquals(Math.ceil(testBot.calcMegabytes(testValue)), 1);
});

Deno.test(async function buildBlacklistRegexTest() {
  const testBot = new E621Bot("TEST_TOKEN", "TEST_TOKEN", 0, "",0, [
    "feces",
    "murder",
    "waterworks",
  ]);
  await assertEquals(
    testBot.buildBlacklistRegex(),
    /(feces|murder|waterworks)/,
  );
});
