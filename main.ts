import { InlineQueryResult } from "grammy/types";
import { E621Bot } from "./models/E621Bot.ts";
import { InlineQueryResultBuilder } from "grammy";
import { helpString, infoString, startString } from "./constants/strings.ts";
import { E621RequestBuilder } from "./models/E621RequestBuilder.ts";
import * as urls from "./constants/urls.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const yiffBot = new E621Bot(
    Deno.env.get("TELEGRAM_BOT_KEY") || "",
    Deno.env.get("E621_API_KEY") || "",
  );

  yiffBot.command("start", async (ctx) =>
    await ctx.reply(
      startString,
      { parse_mode: "HTML" },
    ));

  yiffBot.command("info", async (ctx) => {
    await ctx.reply(
      infoString,
      { parse_mode: "HTML" },
    );
  });

  yiffBot.command("help", async (ctx) => {
    await ctx.reply(helpString, { parse_mode: "HTML" });
  });

  // INLINE QUERIES
  yiffBot.on("inline_query", async (ctx) => {
    const request = await yiffBot.parseInlineQuery(ctx.inlineQuery.query, new E621RequestBuilder("50"));
    const inlineQueryResults: Array<InlineQueryResult> = [];
    if (ctx.inlineQuery.query.length === 0) request.order = urls.order.random;
    const yiffRequest = await yiffBot.sendRequest(request.buildUrl());
    console.log(request.buildUrl());
    const yiffJson = await yiffRequest.json();
    for (const post in yiffJson.posts) {
      switch (yiffJson.posts[post].file.ext) {
        case ("jpg"): {
          const result = InlineQueryResultBuilder.photo(
            `${post}`,
            yiffJson.posts[post].file.url,
          );
          inlineQueryResults.push(result);
          break;
        }
        case ("png"): {
          const result = InlineQueryResultBuilder.photo(
            `${post}`,
            yiffJson.posts[post].file.url,
          );
          inlineQueryResults.push(result);
          break;
        }
        case ("gif"): {
          const result = InlineQueryResultBuilder.gif(
            `${yiffJson.posts[post].id}`,
            yiffJson.posts[post].file.url,
            yiffJson.posts[post].preview.url,
          );
          inlineQueryResults.push(result);
          break;
        }
        case ("mp4"): {
          const result = InlineQueryResultBuilder.videoMp4(
            `${yiffJson.posts[post].id}`,
            `${yiffJson.posts[post].tags.artist[0]}`,
            `${yiffJson.posts[post].file.url}`,
            `${yiffJson.posts[post].preview.url}`,
          ).text(`${urls.baseUrl}/${yiffJson.posts[post].id}`);
          inlineQueryResults.push(result);
          break;
        }
        case ("webm"): {
          const result = InlineQueryResultBuilder.videoMp4(
            `${yiffJson.posts[post].id}`,
            `${yiffJson.posts[post].tags.artist[0]}`,
            `${yiffJson.posts[post].file.url}`,
            `${yiffJson.posts[post].preview.url}`,
          ).text(`${urls.baseUrl}/${yiffJson.posts[post].id}`);
          inlineQueryResults.push(result);
          break;
        }
        default: {
          console.log(
            `Unknown File Extension: ${yiffJson.posts[post].file.ext}`,
          );
        }
      }
    }
    await ctx.answerInlineQuery(inlineQueryResults);
  });

  yiffBot.catch(async (err) => {
    await console.log(`E621Bot Error: ${err.message} Fuck You!!`);
  });

  yiffBot.start();
}