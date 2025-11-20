import { API_PAGE_SIZE } from "../constants/numbers.ts";
import { E621UrlBuilder } from "./E621UrlBuilder.ts";
import * as urls from "../constants/urls.ts";

export class E621UrlBuilderPools implements E621UrlBuilder {
    baseUrl: string;
    endpoint: string;
    limit: number;
    search?: string;
    query?: string;

    constructor(
        baseUrl: string = urls.baseUrl,
        endpoint: string = urls.endpoint.pools,
        limit: number = API_PAGE_SIZE,
        search?: string,
        query?: string
    ) {
        this.baseUrl = baseUrl;
        this.endpoint = endpoint;
        this.limit = limit;
        this.search = search;
        this.query = query;
    }

    buildUrl(): string {
      return `${this.baseUrl}${this.endpoint}?limit=${this.limit}&search[${this.search}]=${this.query?.split(" ").join("+")}`;
    }
}