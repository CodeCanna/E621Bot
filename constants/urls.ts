/**
 * Base e621.net URL
 */
export const baseUrl: string = "https://e621.net";

/**
 * Different endpoints on e621
 */
export const endpoint = {
  posts: "/posts",
  pools: "/pools",
  json: {
    posts: "/posts.json",
    pools: "/pools.json"
  }
};

/**
 * Pool search types
 */
export const poolSearch = {
  nameMatches: "name_matches",
  id: "id",
  descriptionMatches: "description_matches",
  creatorName: "creator_name",
  creatorId: "creator_id",
  isActive: "is_active",
  category: "category",
  order: {
    name: "name",
    createdAt: "created_at",
    updatedAt: "updated_at",
    postCount: "post_count",
  },
};

/**
 * Post ratings
 */
export const rating = { // The rating of a post or a rating to search by
  safe: encodeURIComponent("rating:safe"),
  questionable: encodeURIComponent("rating:questionable"),
  explicit: encodeURIComponent("rating:explicit"),
};

/**
 * Post filetypes
 */
export const fileType = {
  jpg: encodeURIComponent("type:jpg"),
  png: encodeURIComponent("type:png"),
  gif: encodeURIComponent("type:gif"),
  mp4: encodeURIComponent("type:mp4"),
};

/**
 * Orders to load posts in
 */
export const order = {
  score: encodeURIComponent("order:score"),
  favcount: encodeURIComponent("order:favcount"),
  random: encodeURIComponent("order:random"),
  hot: encodeURIComponent("order:hot"),
};

/**
 * Date parameters to get posts by
 */
export const date = {
  today: encodeURIComponent("date:today"),
  yesterday: encodeURIComponent("date:yesterday"),
  byDate: encodeURIComponent("date:"),
};
