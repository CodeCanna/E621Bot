import { Bot } from "grammy";
import { E621UrlBuilderPosts } from "./E621UrlBuilderPosts.ts";
import { ONE_MEGABYTE, REQUEST_TIME_LIMIT} from "../constants/numbers.ts";
import { blacklist as bl } from "../constants/strings.ts";
import { E621UrlBuilderPools } from "./E621RequestBuilderPools.ts";

/**
 * E621Bot can get streams of images based on a users inline query
 */
export class E621Bot extends Bot {
  telegramtelegramApiKey: string;
  e621ApiKey: string;
  hits: number;
  blacklistedResults: number;
  blacklist: string[];
  constructor(
    telegramApiKey: string,
    e621ApiKey: string,
    hits: number = 0,
    blacklistedResults: number = 0,
    blacklist: string[] = bl,
  ) {
    super(telegramApiKey);
    this.telegramtelegramApiKey = telegramApiKey;
    this.e621ApiKey = e621ApiKey;
    this.hits = hits;
    this.blacklistedResults = blacklistedResults;
    this.blacklist = blacklist;
  }

  /**
   * @param url url to fetch images from
   * @returns Promise<Response>
   */
  async sendRequest(url: string): Promise<Response> {
    const sleep = (ms: number) =>
      new Promise((resolve) => {
        console.log("Request Sent");
        setTimeout(resolve, ms);
      });
    const username: string = "Froogal";
    const response = await fetch(url, {
      headers: {
        "Authorization": "Basic " +
          btoa(`${username}:${this.e621ApiKey}`),
        "User-Agent": `NMDergBot/1.0 (by ${username} on e621)`,
      },
    });
    await sleep(REQUEST_TIME_LIMIT);
    return response;
  }

  /**
   * @param query
   * @param request_builder
   * @returns
   */
  async parseInlineQuery(
    query: string,
    urlBuilder: E621UrlBuilderPosts,
  ): Promise<E621UrlBuilderPosts> {
    // Parse the query string by spaces
    const queryTags: string[] = query.toLowerCase().split(" ");

    // Create an array to store the parsed tags
    const parsedTags = new Array<string>();

    // Check for key words and build key word tags as needed
    for (const tag in queryTags) {
      if (
        /(today|yesterday|[0-9]{4}-[0-9]{2}-[0-9]{2})/.test(queryTags[tag])
      ) {
        urlBuilder.date = `date:${queryTags[tag]}`;
        continue;
      }

      if (/(safe|questionable|explicit)/.test(queryTags[tag])) {
        urlBuilder.rating = `rating:${queryTags[tag]}`;
        continue;
      }

      if (/(score|favcount|random|hot)/.test(queryTags[tag])) {
        urlBuilder.order = `order:${queryTags[tag]}`;
        continue;
      }

      if (/(jpg|png|gif|mp4|webm)/.test(queryTags[tag])) {
        urlBuilder.fileType = `type:${queryTags[tag]}`;
        continue;
      }
      parsedTags.push(queryTags[tag]);
    }
    urlBuilder.tags = parsedTags;
    return await urlBuilder;
  }

  async parseInlineQueryPools(query: string, urlBuilder: E621UrlBuilderPools): E621UrlBuilderPools {
    // put logic in main for pools here
  }

  /**
   * Calculate the number of megabytes were passed
   * @param bytes
   * @returns The number of bytes passed to it in megabyte format
   */
  calcMegabytes(bytes: number): number {
    return bytes / ONE_MEGABYTE; // Divide number of bytes by the number of bytes equal to one megabytes
  }

  buildBlacklistRegex(): RegExp | null {
    if (this.blacklist.length === 0) return null;
    return new RegExp("(" + this.blacklist.join("|") + ")");
  }
}
